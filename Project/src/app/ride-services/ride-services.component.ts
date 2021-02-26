import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ride-services-component',
    templateUrl: './ride-services.component.html',
    styleUrls: ['./ride-services.component.css']
})
export class RideServicesComponent implements OnInit, AfterViewInit {

    lat: number = 43.6556101;
    lng: number = -79.37587479999999;

    cars: any;
    cartItems = [];
    loading = true;
    selected = 0;
    user;

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

    address = '';
    name = '';
    zip_code = '';
    latitude = 0;
    longitude = 0;
    zoom = 0;

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

    ngOnInit() {
        // Gets the cars from the back-end by making a get request.
        this.dataService.getCars().subscribe(
            success => {
                this.cars = success;
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

    calculateAndDisplayRoute(origin, destination) {
        this.directionService.route({ origin, destination, travelMode: google.maps.TravelMode.DRIVING },
            (response, status) => {
                if (status === "OK") {
                    this.directionsRenderer.setDirections(response);
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
        if (this.selected) {
            this.displayPickRideError = false;
            this.calculateAndDisplayRoute(this.origin, this.destination);
        } else {
            this.displayPickRideError = true;
        }
    }
}

