import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, AfterViewInit {

  rideGreen = false;
  cartItems = [];
  checkout = false;
  subTotal = 0;
  delivery = 0;
  subTotalTxt = '';
  deliveryTxt = '';

  lat: number = 43.6556101;
  lng: number = -79.37587479999999;
  directionRenderers = [];
  maps = [];

  @ViewChildren('mapContainer') containers;

  constructor(private dataService: DataService) { 
  }

  /**
   * Upon initializing sets event listener on cartItems.
   */
  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [];
    this.isRideGreen();
    this.resetTotal();
    console.log(this.cartItems);
  }

  ngAfterViewInit() {
    this.containers.changes.subscribe(() => this.initializeMaps());
    this.initializeMaps();
  }

  onDrop(data) {
    if (this.dataService.addOrderToCart(data)) {
      this.cartItems.push(data);
      this.isRideGreen();
      console.log(this.cartItems);
      this.resetTotal();
    }
  }

  initializeMaps() {
    console.log('here');
    this.cartItems.forEach((item, index) => {
      const mapContainer = document.getElementsByClassName('map');
      const coordinates = new google.maps.LatLng(this.lat, this.lng);
      const mapOptions: google.maps.MapOptions = {
        center: coordinates,
        zoom: 8,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      const map = new google.maps.Map(mapContainer[index],
        mapOptions);
      this.maps.push({ 'id': index, 'map': map });
      const directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionRenderers.push({ 'id': index, 'directionRenderer': directionsRenderer });
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(item.Direction);
    });
  }

  /**
   * Takes product object and removes the product from the cartItems array and from the cookie.
   * @param product 
   */
  removeItem(product) {
    this.dataService.removeItem(product);
    this.cartItems.splice(this.cartItems.indexOf(product), 1);
    this.isRideGreen();
  }

  /**
   * Resets the total when the user removes or adds items to the cart.
   * @param event 
   */
  onChange(event) {
    this.isRideGreen();
    this.resetTotal();
  }

  /**
   * Iterates over the cart items and recalculates the total price.
   */
  resetTotal() {
    this.subTotal = 0;
    for (var i = 0; i < this.cartItems.length; i++) {
      this.subTotal += parseFloat(this.cartItems[i].OrderTotal);
      if (this.cartItems[i].DeliveryFee) {
        this.delivery += parseFloat(this.cartItems[i].DeliveryFee);
      }
    }

    this.deliveryTxt = this.delivery.toFixed(2);
    this.subTotalTxt = this.subTotal.toFixed(2);
  }

  isRideGreen() {
    const rideServiceOrders = this.cartItems.filter(cartItem => cartItem.OrderType === 'ride');
    const deliveryServiceOrders = this.cartItems.filter(cartItem => cartItem.OrderType === 'delivery');

    console.log(rideServiceOrders.length);
    console.log(deliveryServiceOrders.length);
    if (rideServiceOrders.length > 0 && deliveryServiceOrders.length > 0) {
      this.rideGreen = true;
    } else {
      this.rideGreen = false;
    }

    console.log(this.rideGreen);
  }

}
