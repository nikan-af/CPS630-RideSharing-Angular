import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../shared/modal.service';
import { DataService } from '../shared/data.service';
import { CookieService } from 'ngx-cookie-service';
import { Order, User } from '../shared/interfaces';

@Component({
    selector: 'nav-component',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements AfterViewInit {
    userIsLoggedIn = false;
    cartItems:Order[] = [];
    user: User;
    @Output() openCart = new EventEmitter();

    @ViewChild('content') content: ElementRef;

    constructor(private modalService: ModalService, private router: Router, private dataService: DataService, private cookieService: CookieService) {
        
        this.dataService.cartItemsBehaviourSubject.subscribe(data => {
            this.cartItems = data;
        });

        this.dataService.userBehaviorSubject.subscribe(data => {
            console.log(data);
            this.user = data;
            console.log(this.user);
        });
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
            this.router.navigate(['']);
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
     * Once the user opens the cart it will emit an event to open the cart component and the sidenav.
     */
    openCartHandler() {
        this.openCart.emit();
    }

    logout() {
        this.dataService.logout();
    }
}