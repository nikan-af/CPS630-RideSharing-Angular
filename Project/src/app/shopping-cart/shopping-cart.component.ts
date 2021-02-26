import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems = [];
  checkout = false;
  subTotal = 0;

  constructor(private dataService: DataService) { }

  /**
   * Upon initializing sets event listener on cartItems.
   */
  ngOnInit(): void {
    this.dataService.cartItemsBehaviourSubject.subscribe(data => {
      this.cartItems = data;
      this.resetTotal();
    });
  }

  /**
   * Takes product object and removes the product from the cartItems array and from the cookie.
   * @param product 
   */
  removeItem(product) {
    this.cartItems.splice(this.cartItems.indexOf(product), 1);
    this.dataService.removeItem(product);
  }

  /**
   * Resets the total when the user removes or adds items to the cart.
   * @param event 
   */
  onChange(event) {
    this.resetTotal();
  }

  /**
   * Iterates over the cart items and recalculates the total price.
   */
  resetTotal() {
    this.subTotal = 0;
    for (var i = 0; i < this.cartItems.length; i++) {
      this.subTotal += this.cartItems[i].price * this.cartItems[i].qty;
    }
  }

}
