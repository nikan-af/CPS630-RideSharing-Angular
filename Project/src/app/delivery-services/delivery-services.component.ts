import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../shared/modal.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, Product } from '../shared/interfaces';
import { LoginAlertComponent } from '../login-alert/login-alert.component';

@Component({
    selector: 'delivery-services',
    templateUrl: './delivery-services.component.html',
    styleUrls: ['./delivery-services.component.css']
})
export class DeliveryServices implements OnInit, AfterViewInit {
    storeSelected = '';
    coffees = [];
    flowers = [];
    orders = [];
    pickUpDate;
    pickUpTime;
    orderObj: Order = {
        Products: [],
        Duration: '',
        Distance: '',
        UserId: -1,
        PickupTime: '',
        PickupDate: '',
        OrderTotal: '',
        StartAddress: '',
        EndAddress: '',
        StartLocationLat: 0,
        StartLocationLng: 0,
        EndLocationLat: 0,
        EndLocationLng: 0,
        DeliveryFee: '',
        Direction: {},
        OrderType: 'delivery'
    };

    @ViewChild('destination') end: ElementRef;
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    orginFlower = {
        lat: 43.7803474,
        lng: -79.41540479999999
    };
    originCoffee = {
        lat: 43.64348629999999,
        lng: -79.4055869
    }
    destination = {
        lat: 44.2423231,
        lng: -76.495364
    };
    lat: number = 43.6556101;
    lng: number = -79.37587479999999;
    address = '';
    name = '';
    zip_code = '';
    latitude = 0;
    longitude = 0;
    zoom = 0;
    distance = '';
    duration = '';
    distanceNumber = 0;
    directionsReponse;

    directionService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    map: google.maps.Map;
    coordinates = new google.maps.LatLng(this.lat, this.lng);
    mapOptions: google.maps.MapOptions = {
        center: this.coordinates,
        zoom: 8
    };

    totalEstimateValue = 0;
    totalEstimate = '0';
    displayEstimate = false;
    startFee = 5.00;
    taxesValue = 0;
    taxes = '0';
    total = '0';
    totalValue = 0;

    constructor(private router: Router, private dataService: DataService, private toastr: ToastrService, private dialog: MatDialog, private modalService: ModalService, private cookieService: CookieService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        if (!this.dataService.tempUser.Email) {
            this.router.navigate(['/']);
            const dialogRef = this.dialog.open(LoginAlertComponent, {
                width: '400px',
                height: '150px'
            });
        }

        this.dataService.getCoffees().subscribe(
            success => {
                console.log(success['records']);
                this.coffees = success['records'];
            }
        );

        this.dataService.getFlowers().subscribe(
            success => {
                console.log(success['records']);
                this.flowers = success['records'];
            }
        );
    }

    ngAfterViewInit() {
        this.mapInitializer();
        this.findAdressDestination();
    }

    mapInitializer() {
        this.map = new google.maps.Map(this.gmap.nativeElement,
            this.mapOptions);
        this.directionsRenderer.setMap(this.map);
    }

    findAdressDestination() {
        let autocomplete = new google.maps.places.Autocomplete(this.end.nativeElement, { componentRestrictions: { country: "ca" } });
        autocomplete.addListener("place_changed", () => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.address = place.formatted_address;
            this.name = place.name;
            this.zip_code = place.address_components[place.address_components.length - 1].long_name;
            this.destination.lat = place.geometry.location.lat();
            this.destination.lng = place.geometry.location.lng();
            this.zoom = 12;
            console.log(this.destination);
        });
    }

    selectStore(storeName) {
        this.storeSelected = storeName;
    }

    /**
     * Opens the product-dialog.component and passes in the product item so that the details can be used on the dialog
     * Adds an attribute to the product object called 'favorite' so that if true then the "Add to favorites" button
            will get hidden because the item is already added to favorites.
     * @param product 
     */
    openProductDialog(product, productType) {
        const dialogRef = this.dialog.open(ProductDialogComponent, {
            panelClass: 'custom-dialog-container',
            width: '300px',
            height: '500px',
            data: { ...product, productType }
        });

        dialogRef.afterClosed().subscribe(
            data => {
                this.orders.push(data);
                console.log(this.orders);
                this.orderObj.Products = this.orders;
            }
        )
    }

    reviewOrder() {
        if (this.storeSelected === 'coffeeStore') {
            this.calculateAndDisplayRoute(this.originCoffee, this.destination);
        } else {
            this.calculateAndDisplayRoute(this.orginFlower, this.destination);
        }
    }

    calculateAndDisplayRoute(origin, destination) {
        this.directionService.route({ origin, destination, travelMode: google.maps.TravelMode.DRIVING },
            (response, status) => {
                if (status === "OK") {
                    console.log(response.routes[0].legs[0]);
                    this.distance = response.routes[0].legs[0].distance.text;
                    this.duration = response.routes[0].legs[0].duration.text;
                    this.distanceNumber = response.routes[0].legs[0].distance.value;
                    this.directionsRenderer.setDirections(response);

                    this.orders.forEach(order => {
                        this.totalValue += order.Price * order.Qty;
                    });

                    console.log(this.totalValue);

                    this.directionsReponse = response;
                    this.totalEstimateValue = (this.distanceNumber * 1.32 / 1000) + 5;
                    this.totalEstimate = (this.totalEstimateValue).toFixed(2);
                    this.taxesValue = (this.totalEstimateValue + this.totalValue) * 15.33 / 100;
                    console.log(this.taxesValue);
                    this.taxes = this.taxesValue.toFixed(2);
                    this.totalValue += this.taxesValue + this.totalEstimateValue;
                    this.total = this.totalValue.toFixed(2);

                    this.orderObj.Duration = this.duration;
                    this.orderObj.Distance = this.distance;
                    this.orderObj.EndAddress = response.routes[0].legs[0].end_address;
                    this.orderObj.StartAddress = response.routes[0].legs[0].start_address;
                    this.orderObj.PickupDate = this.pickUpDate;
                    this.orderObj.PickupTime = this.pickUpTime;
                    this.orderObj.Direction = response;
                    this.orderObj.DeliveryFee = this.totalEstimate;
                    this.orderObj.OrderTotal = this.total;
                    this.orderObj.StartLocationLat = response.routes[0].legs[0].start_location.lat();
                    this.orderObj.StartLocationLng = response.routes[0].legs[0].start_location.lng();
                    this.orderObj.EndLocationLat = response.routes[0].legs[0].start_location.lat();
                    this.orderObj.EndLocationLng = response.routes[0].legs[0].start_location.lng();
                    console.log(this.orderObj);
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }

}
