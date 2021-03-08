import { Injectable, Output, EventEmitter, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { User, Order, Trip, Car, Payment, Product } from './interfaces';

@Injectable()
export class DataService {
    cartItems = [];

    cartItemsBehaviourSubject: BehaviorSubject<any>;
    isLoggedInBehvaiourSubject: BehaviorSubject<any>;
    userBehaviorSubject: BehaviorSubject<User>;
    ordersInfoBehaviourSubject: BehaviorSubject<any>;

    loginRef: ElementRef;
    loggedIn = false;
    orders = [];

    tempUser: User = {
        UserId: 0,
        Email: '',
        Password: '',
        Name: '',
        Tel: '',
        Address: '',
        CityCode: '',
        Balance: 0,
        isAdmin: 0
    };
 
    baseUrl: string = "http://localhost:8080/api";
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    constructor(private httpClient: HttpClient, private cookieService: CookieService) { 
        // These are the behavour subjects used in different components to notify other components when the user logs in and data is retrieved from the backend.
        this.cartItemsBehaviourSubject = new BehaviorSubject<any>(this.orders);
        this.isLoggedInBehvaiourSubject = new BehaviorSubject<any>(this.loggedIn);
        this.userBehaviorSubject = new BehaviorSubject<any>(this.tempUser);
        this.ordersInfoBehaviourSubject = new BehaviorSubject<any>(this.orders);

        this.cartItems = JSON.parse(localStorage.getItem("cartItems"));
        console.log(this.cartItems)

        if (!this.cartItems || this.cartItems.length === 0) {
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
            this.cartItemsBehaviourSubject.next([]);
        } else {
            this.cartItemsBehaviourSubject.next(this.cartItems);
        }

        this.userBehaviorSubject.next(this.tempUser);
        this.userBehaviorSubject.subscribe(
            user => {
                this.tempUser = user;
            }
        );


    }

    /**
     * Makes a post request to login.php end point to sign in.
     * @param email 
     * @param password 
     */
    public userlogin(email, password) {
        return this.httpClient.post(this.baseUrl + '/user/login.php', { 'email': email, 'password': password });
    }

    public getUsers() {
        return this.httpClient.get(this.baseUrl + '/user/readAll.php');
    }

    public deleteUser(UserId) {
        return this.httpClient.post(this.baseUrl + '/user/delete.php', {UserId});
    }

    public updateUser(data) {
        console.log({...data});
        return this.httpClient.post(this.baseUrl + '/user/update.php', {...data});
    }

    public getUserByUserId(UserId) {
        return this.httpClient.post(this.baseUrl + '/user/readOne.php', { UserId });
    }

    /**
     * Takes an object with fullName, email and password as parameters and makes a post request to register.php endpoint to register a new user.
     * @param param0 
     */
    registerUser(user) {
        console.log({'Name': user.Name, 'Email': user.Email, 'Password': user.Password, 'Tel': user.Tel, 'Address': user.Address, 'CityCode': user.CityCode, 'isAdmin': user.isAdmin ? user.isAdmin : '0', 'Balance': user.Balance ? user.Balance : 0})
        return this.httpClient.post(this.baseUrl + '/user/register.php', {'Name': user.Name, 'Email': user.Email, 'Password': user.Password, 'Tel': user.Tel, 'Address': user.Address, 'CityCode': user.CityCode, 'isAdmin': user.isAdmin ? user.isAdmin : '0', 'Balance': user.Balance ? user.Balance : 0});
    }

    getCoffees() {
        return this.httpClient.get(this.baseUrl + '/coffee/read.php');
    }

    getFlowers() {
        return this.httpClient.get(this.baseUrl + '/flower/read.php');
    }

    /**
     * Logs out the user and updates the behaviour subjects to inform other components that the user has signed out and reset the components.
     */
    logout() {
        this.userBehaviorSubject.next(
            {
                UserId: 0,
                Name: '',
                Password: '',
                Email: '',
                Tel: '',
                Address: '',
                CityCode: '',
                Balance: 0,
                isAdmin: 0
            }
        );
        this.isLoggedInBehvaiourSubject.next(false);

    }

    /**
     * Returns the cars that we have for ride services.
     */
    getCars() {
        return this.httpClient.get(this.baseUrl + '/car/read.php');
    }

    /**
     * Gets the cartItems cookie that contains the products that user has added to cart and parses the object as JSON.
     */
    getCartItems() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (!cartItems) {
            return [];
        } else {
            return cartItems;
        }
    }

    updateCartListFromLocal() {
        this.cartItems  = this.getCartItems();
    }

    /**
     * Takes in the order.
     * Makes a call to getCartItems to get the order items already in the cart if the item is in the cart ignore if not add the order to 
            the cart.
     * After that it stringifies the object as JSON and saves that JSON as cookie.
     * @param order 
     */
    addOrderToCart(order) {
        this.updateCartListFromLocal();
        console.log(order);
        let tmpOrderObj: Order = order;
        let isOrderPresent = this.cartItems.includes(tmpOrderObj);
        console.log(isOrderPresent);
        if (!isOrderPresent) {
            this.cartItems.push(tmpOrderObj);
            console.log(this.cartItems);
            this.cartItemsBehaviourSubject.next(this.cartItems);
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
            return true;
        }
        
        return false;
    }

    /*
        Updates the cart behaviour subject.
    */
    updateCartItems() {
        return new BehaviorSubject<any>(this.cartItems);
    }

    /**
     * Resets the cart cookie to empty array 
     */
    resetCart() {
        this.cartItems = [];
        this.cartItemsBehaviourSubject.next([]);
        localStorage.setItem("cartItems", JSON.stringify([]));
    }

    /**
     * Takes in an order object as a parameter
     * Calls getCartItems to get the items in the cart
     * Checks whether the product is already in the cart
     * @param order 
     */
    removeItem(order) {
        this.updateCartItems();
        this.cartItems.splice(this.cartItems.indexOf(order), 1);
        this.cartItemsBehaviourSubject.next(this.cartItems);
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    }

    /**
     * Takes formData as parameter and makes a post request to 'sendInquiryForm.php' to insert the inquiry into the inquiries table.
     * @param formData 
     */
    sendInquiryForm(formData) {
        console.log(formData);
        return this.httpClient.post(this.baseUrl + '/inquiry/create.php', {FName: formData.first_name, LName: formData.last_name, Email: formData.email, TypeOfInquiry: formData.type_of_inquiry, Message: formData.message});
    }

    /**
     * Takes in userId and makes a post request to 'getPaymentInfo.php' to get the payment info on the last order of the user.
     * @param userId 
     */
    getPaymentInfo(userId) {
        return this.httpClient.post(this.baseUrl + '/getPaymentInfo.php', { "userId":userId });
    }

    // /**
    //  * Takes in userId and makes a post request to 'getOrders.php' to get the past orders of the user.
    //  * @param userId 
    //  */
    // getOrders(userId) {
    //     return this.httpClient.post(this.baseUrl + '/getOrders.php', {"userId":userId});
    // }

    createOrder(data) {
        console.log(data);
        let orderTotal = 0;

        let payment: Payment = {PaymentId: 0, CardHolder: data.payment.credit_card_holder, CardHolderFirstName: data.payment.credit_card_first_name
            , CardHolderLastName: data.payment.credit_card_last_name, CardNumber: data.payment.credit_card_number, ExpiryYear: data.payment.expiry_year,
            ExpiryMonth: data.payment.expiry_month, CardAddressLine1: data.payment.credit_card_address_line_1, CardAddressLine2: data.payment.credit_card_address_line_2,
            City: data.payment.city, Country: data.payment.country, PostalCode: data.payment.postal_code, StateOrProvince: data.payment.province};

        let trips: Trip[] = [];

        let products: Product[] = [];
        
        data.order.forEach((order, index) => {
            orderTotal += parseFloat(order.OrderTotal);
            orderTotal += order.DeliveryFee ? parseFloat(order.DeliveryFee) : 0;
            let trip: Trip = {
                TripId: 0,
                OrderId: 0,
                CarId: order.Car ? order.Car.CarId : 1,
                Distance: order.Distance,
                Duration: order.Duration,
                StartAddress: order.StartAddress,
                EndAddress: order.EndAddress,
                StartLocationLat: order.StartLocationLat,
                StartLocationLng: order.StartLocationLng,
                EndLocationLat: order.EndLocationLat,
                EndLocationLng: order.EndLocationLng,
            }
            

            if (order.OrderType === 'delivery') {
                products.push(...order.Products);
            } else if (order.OrderType === 'ride') {
                trip.CarId = order.Car.CarId;
            }

            trips.push(trip);
        });

        let order = {
            UserId: this.tempUser.UserId,
            Total: orderTotal
        };

        console.log({Payment: payment, Trips: trips, Order: order, Products: products});
        return this.httpClient.post(this.baseUrl + '/order/create.php', {Payment: payment, Trips: trips, Order: order, Products: products});
    }

    /**
     * Returns a new behaviour subject on loggedIn boolean to inform other components when the user logs in.
     */
    isLoggedIn() {
        return new BehaviorSubject<any>(this.loggedIn);
    }
}















