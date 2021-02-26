import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../shared/modal.service';
import { DataService } from '../shared/data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'nav-component',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements AfterViewInit {
    closeResult = '';
    isMenuCollapsed: boolean;
    optionsBoxOpen = false;
    pageName = 'propertyListings';
    userIsLoggedIn = false;
    cartItems = [];
    @Output() openCart = new EventEmitter();

    @ViewChild('content') content: ElementRef;

    constructor(private modalService: ModalService, private router: Router, public dataService: DataService, private cookieService: CookieService) {
        this.cartItems = JSON.parse(this.cookieService.get("cartItems"));
    }

    ngAfterViewInit() {
        this.dataService.loginRef = this.content;
    }

    /**
     * If the user is not logged in open the login modal otherwise log out.
     * @param content 
     */
    handleLogin(content) {
        if (this.userIsLoggedIn) {
            this.userIsLoggedIn = false;
            this.dataService.logout();
        } else {
            this.modalService.open(content);
        }
    }

    /**
     * Once the user logs in we set the userIsLoggedIn flag to change the sign in icon to sign out.
     * @param event 
     */
    onUserStatusChange(event) {
        if (event === 'loggedIn') {
            this.userIsLoggedIn = true;
        }
    }

    /**
     * Sets the gender for products compoenent so that we can fetch the products for that gender using the flag
     * @param gender 
     */
    setProductsGender(gender) {
        this.dataService.genderOfProducts = gender;
    }

    /**
     * Once the user opens the cart it will emit an event to open the cart component and the sidenav.
     */
    openCartHandler() {
        this.openCart.emit();
    }
}