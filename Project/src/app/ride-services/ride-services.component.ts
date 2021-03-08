import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../shared/interfaces';

@Component({
    selector: 'ride-services-component',
    templateUrl: './ride-services.component.html',
    styleUrls: ['./ride-services.component.css']
})
export class RideServicesComponent implements OnInit, AfterViewInit {
    orderObj: Order = {
        UserId: -1,
        Car: null, 
        OrderTotal: '', 
        PickupTime: '', 
        PickupDate: '', 
        Direction: null, 
        OrderType: 'ride',
        Distance: '',
        Duration: '',
        StartAddress: '',
        EndAddress: '',
        StartLocationLat: 0,
        StartLocationLng: 0,
        EndLocationLng: 0,
        EndLocationLat: 0
    };

    lat: number = 43.6556101;
    lng: number = -79.37587479999999;

    cars: any;
    cartItems = [];
    loading = false;
    selected = -1;
    user;
    getRoute = false;
    showOrderReview = false;
    pickUpDate;
    pickUpTime;

    pos = {
        top: 0,
        left: 0
    }

    @ViewChild('source') source: ElementRef;
    @ViewChild('destination') end: ElementRef;

    origin = {
        lat: 24.799448,
        lng: 120.979021
    };

    destination = {
        lat: 24.799524,
        lng: 120.975017
    };

    displayDirections = true;
    displayPickRideError = false;
    directionsReponse;

    address = '';
    name = '';
    zip_code = '';
    latitude = 0;
    longitude = 0;
    zoom = 0;
    distance = '';
    duration = '';
    distanceNumber = 0;

    totalEstimateValue = 0;
    totalEstimate = '0';
    displayEstimate = false;
    startFee = 5.00;
    driverTipValue = 0;
    driverTip = '0';
    taxesValue = 0;
    taxes = '0';
    total = '0';
    totalValue = 0;

    directionService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    map: google.maps.Map;
    coordinates = new google.maps.LatLng(this.lat, this.lng);
    mapOptions: google.maps.MapOptions = {
        center: this.coordinates,
        zoom: 8
    };
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

    constructor(private ngZone: NgZone, private toastr: ToastrService, private dataService: DataService, private cookieService: CookieService) {
        // this.cartItems = JSON.parse(this.cookieService.get("cartItems"));
    }

    onDragStart(data) {
        this.moveDiv(data);
    }

    moveDiv(data) {
        this.pos.top = data.y - 50;
        this.pos.left = data.x - 45;
    }

    ngOnInit() {
        // Gets the cars from the back-end by making a get request.
        this.dataService.getCars().subscribe(
            success => {
                console.log(success);
                this.cars = success['records'];
                console.log(this.cars);
                this.loading = false;
            }, fail => {
                console.log(fail);
            }
        )

        // Sets behaviour subject on user data so that in case the user logs in or out the code block gets executed.
        this.dataService.userBehaviorSubject.subscribe(
            success => {
                this.user = success;
                this.loading = true;
            }
        );
    }

    mapInitializer() {
        this.map = new google.maps.Map(this.gmap.nativeElement,
            this.mapOptions);
        this.directionsRenderer.setMap(this.map);
    }

    select(id) {
        this.selected = id;
    }

    reviewOrder() {
        this.orderObj.Car = this.cars[this.selected];
        this.showOrderReview = true;
    }

    calculateAndDisplayRoute(origin, destination) {
        this.getRoute = true;
        this.directionService.route({ origin, destination, travelMode: google.maps.TravelMode.DRIVING },
            (response, status) => {
                if (status === "OK") {
                    console.log(response.routes[0].legs[0]);
                    this.distance = response.routes[0].legs[0].distance.text;
                    this.duration = response.routes[0].legs[0].duration.text;
                    this.distanceNumber = response.routes[0].legs[0].distance.value;
                    this.directionsRenderer.setDirections(response);

                    this.directionsReponse = response;
                    this.totalEstimateValue = (this.distanceNumber * parseFloat(this.cars[this.selected].CarPrice) / 1000) + this.startFee;
                    this.totalEstimate = (this.totalEstimateValue).toFixed(2);
                    this.driverTipValue = this.totalEstimateValue * 5 / 100;
                    this.driverTip = this.driverTipValue.toFixed(2);
                    this.taxesValue = this.totalEstimateValue * 15.33 / 100;
                    this.taxes = this.taxesValue.toFixed(2);
                    this.totalValue = this.taxesValue + this.driverTipValue + this.totalEstimateValue;
                    this.total = this.totalEstimateValue.toFixed(2);
                    this.loading = false;

                    this.orderObj.Duration = this.duration;
                    this.orderObj.Distance = this.distance;
                    this.orderObj.EndAddress = response.routes[0].legs[0].end_address;
                    this.orderObj.StartAddress = response.routes[0].legs[0].start_address;
                    this.orderObj.PickupDate = this.pickUpDate;
                    this.orderObj.PickupTime = this.pickUpTime;
                    this.orderObj.Direction = response;
                    this.orderObj.OrderTotal = this.total;
                    this.orderObj.StartLocationLat = response.routes[0].legs[0].start_location.lat();
                    this.orderObj.StartLocationLng = response.routes[0].legs[0].start_location.lng();
                    this.orderObj.EndLocationLat = response.routes[0].legs[0].start_location.lat();
                    this.orderObj.EndLocationLng = response.routes[0].legs[0].start_location.lng();
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }

    ngAfterViewInit() {
        this.mapInitializer();
        this.findAdressSource();
        this.findAdressDestination();
    }

    findAdressSource() {
        let autocomplete = new google.maps.places.Autocomplete(this.source.nativeElement, {componentRestrictions: { country: "ca" }});
        autocomplete.addListener("place_changed", () => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.address = place.formatted_address;
            this.name = place.name;
            this.zip_code = place.address_components[place.address_components.length - 1].long_name;
            //set latitude, longitude and zoom
            this.origin.lat = place.geometry.location.lat();
            this.origin.lng = place.geometry.location.lng();
            this.zoom = 12;
        });
    }

    findAdressDestination() {
        let autocomplete = new google.maps.places.Autocomplete(this.end.nativeElement, {componentRestrictions: { country: "ca" }});
        autocomplete.addListener("place_changed", () => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.address = place.formatted_address;
            this.name = place.name;
            this.zip_code = place.address_components[place.address_components.length - 1].long_name;
            //set latitude, longitude and zoom
            this.destination.lat = place.geometry.location.lat();
            this.destination.lng = place.geometry.location.lng();
            this.zoom = 12;
        });
    }

    onGetEstimate() {
        if (this.selected !== -1) {
            this.displayPickRideError = false;
            this.displayEstimate = true;
            this.loading = true;
            this.calculateAndDisplayRoute(this.origin, this.destination);
        } else {
            this.displayPickRideError = true;
        }
    }
}

