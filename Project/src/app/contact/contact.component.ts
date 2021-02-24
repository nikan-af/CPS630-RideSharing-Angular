import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // Regex expression for a valid email address
  emailRX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  email;
  contact_form_validations;
  type_of_inquiry;
  formSent = false;

  inquiryTypeOptions = { 
    option1: 'Returns',
    option2: 'Shipping',
    option3: 'Tech',
    option4: 'Any Other Inquiry' 
  };

  // Error messages when the form fields are not valid 
  errorMessages = {
    first_name: [
      { type: 'required', message: 'First name is required.' },
      { type: 'pattern', message: 'First name must only contain letters.' }
    ],
    last_name: [
      { type: 'required', message: 'Last name is required.' },
      { type: 'pattern', message: 'Last name must only contain letters.' }
    ],
    email: [
      { type: 'required', message: 'Email address is required.' },
      { type: 'pattern', message: 'Please enter a valid email address.' }
    ],
    type_of_inquiry: [
      { type: 'required', message: 'Please select a type.' },
    ],
    message: [
      { type: 'required', message: 'Message is required.' },
      { type: 'maxLength', message: 'Max characters 265.' }
    ]
  }

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {

    // Form validator
    this.contact_form_validations = this.formBuilder.group({
      first_name: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')])
        , updateOn: 'blur'
      }),
      last_name: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')])
        , updateOn: 'blur'
      }),
      email: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern(this.emailRX)
        ]),
        updateOn: 'blur'
      }),
      type_of_inquiry: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
      message: new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.maxLength(265)
        ]),
        updateOn: 'blur'
      })
    });
  }

  /**
   * Checks whether the form fields are valid
   * submits the form values to the php backend 
   * Shows the success message when the data is inserted successfully
   */
  submit() {
    if (this.contact_form_validations.valid) {
      let formValues = { 'first_name': '', 'last_name': '', 'email': '', 'type_of_inquiry': '', 'message': '' };
      for (const field in this.contact_form_validations.controls) {
        if (field === 'type_of_inquiry') {
          formValues[field] = this.inquiryTypeOptions[this.contact_form_validations.controls[field].value];
          continue;
        }

        formValues[field] = this.contact_form_validations.controls[field].value;
      }

      this.dataService.sendInquiryForm(formValues).subscribe(
        success => {
          this.toastr.success('We have received your inquiry.');
        }
      );
      this.contact_form_validations.reset();
      for (let name in this.contact_form_validations.controls) {
        this.contact_form_validations.controls[name].setErrors(null);
     }
     this.formSent = true;
    }
  }

}
