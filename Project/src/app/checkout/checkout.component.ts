import { Component, OnInit, Output, EventEmitter, NgZone, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscribable, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatOptionSelectionChange } from '@angular/material/core';
import { DataService } from '../shared/data.service';
import { ModalService } from '../shared/modal.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  usStates = ["AL", "AK", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "NE", "NH", "NJ", "NM", "NV", "NY", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WI", "WV", "WY"];
  canadaProvinces = ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Northwest Territories", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"];
  canada = true;
  province;
  country;
  state;
  purchaseComplete = false;
  loggedIn;
  user: User;
  messageShown = false;

  credit_card_number: string;
  expiry_month = '1';
  years;
  months;
  expiry_year = '20';
  countries = ['ca', 'us'];
  city;
  postcode;
  checkout_validations;
  credit_card_address_line_1: string;
  private userInputTimeout: number;
  private requestSub: Subscription;
  private chosenOption: AddressSuggestion;
  private chosenProperty: AddressSuggestion;
  searchOptions: Subject<AddressSuggestion[]> = new Subject<AddressSuggestion[]>();

  // Error messages that will be shown under the input when the field value is not valid.
  errorMessages = {
    credit_card_number: [
      { type: 'required', message: 'Card number is required.' },
      { type: 'pattern', message: 'Card number is not valid.' }
    ],
    credit_card_holder: [
      { type: 'required', message: 'Card holder\'s name is required.' },
      { type: 'pattern', message: 'Name entered is not valid.' }
    ],
    expiry_month: [
      { type: 'required', message: 'Expiry date is required.' }
    ],
    expiry_year: [
      { type: 'required', message: 'Expiry date is required.' }
    ],
    credit_card_cvv: [
      { type: 'required', message: 'CVV is required.' },
      { type: 'pattern', message: 'CVV is not valid.' }
    ],
    credit_card_first_name: [
      { type: 'required', message: 'First name is required.' },
      { type: 'pattern', message: 'First name entered is not valid.' }
    ],
    credit_card_last_name: [
      { type: 'required', message: 'Last name is required.' },
      { type: 'pattern', message: 'Last name entered is not valid.' }
    ],
    credit_card_address_line_1: [
    ],
    credit_card_address_line_2: [
      { type: 'pattern', message: 'Address entered is not valid.' }
    ],
    country: [
      { type: 'required', message: 'Country is required.' },
      { type: 'pattern', message: 'Country entered is not valid.' }
    ],
    province: [
      { type: 'required', message: 'State/Province is required.' },
      { type: 'pattern', message: 'State/Province entered is not valid.' }
    ],
    city: [
      { type: 'required', message: 'City is required.' },
      { type: 'pattern', message: 'City entered is not valid.' }
    ],
    postal_code: [
      { type: 'required', message: 'Postal code is required.' },
      { type: 'pattern', message: 'Postal code entered is not valid.' }
    ]
  }

  private valueChangesSub: Subscription;

  @Input('cartItems') cartItems: [];

  // When the user clicks on the back icon it will emit an event and goes back to the shopping cart page.
  @Output() goBack = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private http: HttpClient, public zone: NgZone, private dataService: DataService, private modalService: ModalService) {
    this.years = Array(30).fill(1).map((x, i) => `${i + 1}`);
    this.months = Array(12).fill(1).map((x, i) => `${i + 1}`);
  }

  ngOnInit(): void {
    // Gets the user information to check if the user is logged in or not.
    this.dataService.isLoggedInBehvaiourSubject.subscribe(
      success => {
        this.loggedIn = success;
      }
    );
    this.dataService.userBehaviorSubject.subscribe(
      success => {
        this.user = success;
      }
    );

    // Form Validator using Regex
    this.checkout_validations = this.formBuilder.group({
      credit_card_number: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{16}$')])
        , updateOn: 'blur'
      }),
      credit_card_holder: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')])
        , updateOn: 'blur'
      }),
      expiry_month: new FormControl('', {
        validators: Validators.compose([
          Validators.required])
        , updateOn: 'blur'
      }),
      expiry_year: new FormControl('', {
        validators: Validators.compose([
          Validators.required])
        , updateOn: 'blur'
      }),
      credit_card_cvv: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{3,4}$')])
        , updateOn: 'blur'
      }),
      credit_card_first_name: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')])
        , updateOn: 'blur'
      }),
      credit_card_last_name: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')])
        , updateOn: 'blur'
      }),
      credit_card_address_line_1: new FormControl('', {
        validators: Validators.compose([
          Validators.required])
        , updateOn: 'change'
      }),
      credit_card_address_line_2: new FormControl('', {
        updateOn: 'blur'
      }),
      country: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')])
        , updateOn: 'blur'
      }),
      province: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')])
        , updateOn: 'blur'
      }),
      city: new FormControl('', {
        validators: Validators.compose([
          Validators.required])
        , updateOn: 'blur'
      }),
      postal_code: new FormControl('', {
        validators: Validators.compose([
          Validators.required])
        , updateOn: 'blur'
      })
    });

    // This is triggered when the value of the credit_card_address_line_1 changes.
    this.valueChangesSub = this.checkout_validations.get('credit_card_address_line_1').valueChanges.subscribe((value) => {
      
      if (this.userInputTimeout) {
        window.clearTimeout(this.userInputTimeout);
      }

      if (this.chosenOption && this.chosenOption.shortAddress === value) {
        this.searchOptions.next(null);
      }

      // When the user enteres more than 3 characters we will make a call to the Geoapify API
      if (!value || value.length < 3) {
        this.searchOptions.next(null);
        return;
      }

      // We wait 300 ms and then we make the call in case user decides to change the value.
      this.userInputTimeout = window.setTimeout(() => {
        this.generateSuggestions(value);
      }, 300);
    })

    this.dataService.paymentInfoBehaviourService.subscribe(
      success => {
        if (success) {
          var cc = success.credit_card_number;
          var masked = '************' + cc.substr(-4);
          this.checkout_validations.controls['credit_card_number'].setValue(success.credit_card_number);
          this.checkout_validations.controls['credit_card_address_line_1'].setValue(success['credit_card_address_line_1']);
          this.checkout_validations.controls['credit_card_address_line_2'].setValue(success['credit_card_address_line_2']);
          this.checkout_validations.controls['expiry_month'].setValue(success['expiry_month']);
          this.checkout_validations.controls['expiry_year'].setValue(success['expiry_year']);
          this.checkout_validations.controls['credit_card_first_name'].setValue(success['credit_card_first_name']);
          this.checkout_validations.controls['credit_card_last_name'].setValue(success['credit_card_last_name']);
          this.checkout_validations.controls['credit_card_holder'].setValue(success['credit_card_holder']);
          this.checkout_validations.controls['country'].setValue(success['country']);
          this.checkout_validations.controls['city'].setValue(success['city']);
          this.checkout_validations.controls['province'].setValue(success['province']);
          this.checkout_validations.controls['postal_code'].setValue(success['postal_code']);
          this.postcode = success['postal_code'];
          this.city = success['city'];
          this.country = success['country'];
          this.state = success['province'];
          // this.credit_card_number = masked;
        }
      }
    );
  }

  /*
    Submits the checkout form values to the php backend.
  */
  submit() {  
    if (this.checkout_validations.valid) {
      if (this.loggedIn) {
        let formValues = { 'credit_card_number': '', 'credit_card_holder': '', 'expiry_month': '', 'expiry_year': '', 'credit_card_first_name': '', 'credit_card_last_name': '', 'credit_card_address_line_1': '', 'credit_card_address_line_2': '', 'country': '', 'province': '', 'city': '', 'postal_code': '' };
        for (const field in this.checkout_validations.controls) {
          formValues[field] = this.checkout_validations.controls[field].value;
        }
        formValues['userId'] = this.user.id;
        formValues['products'] = this.cartItems;

        /*
          Once the request succeeds reset the form and show success message.
        */
        this.dataService.recordPurchase(formValues).subscribe(
          success => {
            this.purchaseComplete = true;
            this.resetCheckoutForm();
          }, fail => {
            console.log(fail);
          }
        );
        this.checkout_validations.reset();
        for (let name in this.checkout_validations.controls) {
          this.checkout_validations.controls[name].setErrors(null);
        }
        this.purchaseComplete = true;
      } else {
        this.purchaseComplete = true;
        this.resetCheckoutForm();
      }
    }
  }

  // Gets called when the user selects one of the place suggestions provided and we use the information to fill out other form fields.
  public optionSelectionChange(option, event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      if (option.longAddress) {
        this.chosenProperty = option;
        this.city = this.chosenProperty.shortAddress;
        this.postcode = this.chosenProperty.data['postcode'];
        this.canada = this.chosenProperty.data['country_code'] === 'ca' ? true : false;
        this.country = this.chosenProperty.data['country_code'];
        this.state = this.chosenProperty.data['state'];
      } else {
        this.chosenOption = option;
      }
    }
  }

  // Makes the call to geoapify api and uses the data returns to call generateShortAddress() and generateLongAddress() to parse the information.
  generateSuggestions(text: string) {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${text}%20&lang=en&limit=5&filter=countrycode:${this.countries.join(',')}&apiKey=c5c5476a13ca433a95f319127a1e9fbd`;

    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }
    this.requestSub = this.http.get(url).subscribe((data: GeoJSON.FeatureCollection) => {
      const placeSuggestions = data.features.map(feature => {
        const properties: GeocodingFeatureProperties = (feature.properties as GeocodingFeatureProperties);

        return {
          longAddress: this.generateLongAddress(properties),
          shortAddress: this.generateShortAddress(properties, 'property'),
          data: feature.properties
        }
      });

      this.searchOptions.next(placeSuggestions.length ? placeSuggestions : null);
    }, err => {
      console.log(err);
    })
  }

  // Uses the information to generate short address.
  private generateShortAddress(properties: GeocodingFeatureProperties, typeOfSearch): string {
    let shortAddress = properties.name;

    if (typeOfSearch === 'property' && properties.state && properties.city) {
      return properties.city + ', ' + properties.state;
    }
    
    if (properties.address_line1 && properties.address_line2.indexOf(',') !== -1) {
      return properties.address_line2
    }

    if (properties.address_line1) {
      return properties.address_line1;
    }

    shortAddress += (properties.country && properties.country !== properties.name) ? `, ${properties.country}` : '';

    return shortAddress;
  }

  // generates long address
  private generateLongAddress(properties: GeocodingFeatureProperties): string {
    let fullAddress = properties.formatted;
    return fullAddress;
  }

  // resets the checkout form 3 sec after the user submits the form 
  resetCheckoutForm() {
    setTimeout(() => {
      this.dataService.cartItemsBehaviourSubject.next([]);
      this.dataService.resetCart();
      this.messageShown = true;
      this.goBack.emit();
    }, 3000)
  }

  openLogin() {
    this.modalService.open(this.dataService.loginRef);
  }
}

export interface AddressSuggestion {
  longAddress: string;
  shortAddress: string;
  data: any;
}

interface GeocodingFeatureProperties {
  name: string;
  country: string;
  state: string;
  city: string;
  address_line1: string;
  address_line2: string;
  formatted: string;
}