import { Component, OnInit, Input, Inject, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { DataService } from '../shared/data.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarDialogData } from '../ride-services/ride-services.component';
import { ModalService } from '../shared/modal.service';
import { CookieService } from 'ngx-cookie-service';
import { ILatLng } from '../shared/directives-map.directive';
import { MapsAPILoader } from '@agm/core';

@Component({
    selector: 'car-dialog-component',
    templateUrl: './car-dialog.component.html',
    styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent implements OnInit, AfterViewInit {

    car: CarDialogData;
    images: any;
    productDetails;
    loading = true;
    itemAlreadyAdded = false;
    size = 'xs';
    qty = 1;
    cartItems = [];
    user;


    @ViewChild('source') source: ElementRef;
    @ViewChild('destination') end: ElementRef;
    // Washington, DC, USA
    origin: ILatLng = {
        latitude: 38.889931,
        longitude: -77.009003
    };
    // New York City, NY, USA
    destination: ILatLng = {
        latitude: 40.730610,
        longitude: -73.935242
    };
    displayDirections = true;

    address = '';
    name = '';
    zip_code = '';
    latitude = 0;
    longitude = 0;
    zoom = 0;

    constructor(private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private dataService: DataService, public dialogRef: MatDialogRef<CarDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: CarDialogData, private modalSerivce: ModalService) {
        this.cartItems = this.dataService.getCartItems();

        // Gets the user information to see if the user is logged in
        this.dataService.userBehaviorSubject.subscribe(
            success => {
                this.user = success;
            }
        )
    }

    ngOnInit() {
        this.car = this.data;
        console.log(this.car);

        // Gets product images using the productId of the product object passed into the dialog (i.e. this.data)
        // this.dataService.getImages(this.product.productId).subscribe(
        //     success => {
        //         this.images = success;
        //         this.productDetails = JSON.parse(this.product.description);
        //         this.loading = false;
        //     }, fail => {
        //         console.log(fail);
        //     }
        // )
    }

    ngAfterViewInit() {
        // this.findAdressSource();
        // this.findAdressDestination();
    }

    findAdressSource(){
        this.mapsAPILoader.load().then(() => {
             let autocomplete = new google.maps.places.Autocomplete(this.source.nativeElement);
             autocomplete.addListener("place_changed", () => {
               this.ngZone.run(() => {
                 // some details
                 let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                 this.address = place.formatted_address;
                 this.name = place.name;
                 this.zip_code = place.address_components[place.address_components.length - 1].long_name;
                 //set latitude, longitude and zoom
                 this.origin.latitude =  place.geometry.location.lat();
                 this.origin.longitude = place.geometry.location.lng();

                 console.log()
                 this.zoom = 12;

                 console.log(place.geometry.location.lat());
                 console.log(place.geometry.location.lng());
               });
             });
           });
       }

       findAdressDestination(){
        this.mapsAPILoader.load().then(() => {
             let autocomplete = new google.maps.places.Autocomplete(this.end.nativeElement);
             autocomplete.addListener("place_changed", () => {
               this.ngZone.run(() => {
                 // some details
                 let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                 this.address = place.formatted_address;
                 this.name = place.name;
                 this.zip_code = place.address_components[place.address_components.length - 1].long_name;
                 //set latitude, longitude and zoom
                 this.destination.latitude = place.geometry.location.lat();
                 this.destination.longitude = place.geometry.location.lng();
                 this.zoom = 12;

                 console.log(place);
               });
             });
           });
       }

    // Adds the product to the cart when the user clicks "Add to cart" button and creates the cookie and then closes the dialog.
    addToCart() {
        const result = this.dataService.addProductToCart({ ...this.car, 'qty': this.qty, 'size': this.size });

        if (result) {
            this.cartItems.push(this.car);
            this.dialogRef.close();
        } else {
            this.itemAlreadyAdded = true;
        }
    }

    

    // Makes a post request to PHP backend to insert the product into the favorites table or asks the user to login if not logged in.
    addToFavorites() {
        // if (this.user.id === 0) {
        //     this.modalSerivce.open(this.dataService.loginRef);
        // } else {
        //     this.dataService.addFavorite(this.user.id, this.data.productId).subscribe(
        //         success => {
        //         }, fail => {
        //             console.log(fail);
        //         }
        //     );
        // }
    }
}