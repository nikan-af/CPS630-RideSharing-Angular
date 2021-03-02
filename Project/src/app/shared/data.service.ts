import { Injectable, Output, EventEmitter, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

export interface Order {
    Car: Car;
    UserId: number;
    PickupTime: string;
    PickupDate: string;
    TotalFare: string;
    Distance: string;
    Duration: string;
    StartAddress: string;
    EndAddress: string;
    StartLocationLat: number;
    StartLocationLng: number;
    EndLocationLat: number;
    EndLocationLng: number;
    Direction: google.maps.DirectionsResult;
}

export interface Car {
    CarId: number;
    ImageURL: string;
    CarModel: string;
    CarColour: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    cartItems: Order[] = [];
    cartItemsBehaviourSubject: BehaviorSubject<any>;
    isLoggedInBehvaiourSubject: BehaviorSubject<any>;
    userBehaviorSubject: BehaviorSubject<User>;
    userFavoritesBehaviourSubject: BehaviorSubject<any>;
    paymentInfoBehaviourService: BehaviorSubject<any>;
    ordersInfoBehaviourSubject: BehaviorSubject<any>;

    loginRef: ElementRef;
    favoriteItems = [];
    loggedIn = false;
    orders = [];
    paymentInfo:any = {
        orderId: '',
        userId: '',
        productId: '',
        qty: '',
        orderTimestamp: '',
        credit_card_number: '',
        credit_card_holder: '',
        expiry_month: '',
        expiry_year: '', 
        credit_card_first_name: '', 
        credit_card_last_name: '', 
        credit_card_address_line_1: '', 
        credit_card_address_line_2: '', 
        country: '', 
        province: '', 
        city: '', 
        postal_code: ''
    };
    tempUser: User = {
        id: 0,
        email: '',
        pwd: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        postal: '',
        balance: 0
    };

    genderOfProducts = '';
 
    redirectUrl: string;
    /* PROD 
    baseUrl: string = "http://3.138.36.207/";
    */
    baseUrl: string = "http://localhost:8080/api";
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    constructor(private httpClient: HttpClient, private cookieService: CookieService) { 
        var tempCookie = localStorage.getItem("cartItems");
        console.log(tempCookie);

        console.log(tempCookie);
        if (!tempCookie) {
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        } else {
            this.cartItems = JSON.parse(tempCookie);
        }

        // These are the behavour subjects used in different components to notify other components when the user logs in and data is retrieved from the backend.
        this.cartItemsBehaviourSubject = new BehaviorSubject<any>(this.cartItems);
        this.isLoggedInBehvaiourSubject = new BehaviorSubject<any>(this.loggedIn);
        this.userBehaviorSubject = new BehaviorSubject<any>(this.tempUser);
        this.userFavoritesBehaviourSubject = new BehaviorSubject<any>(this.favoriteItems);
        this.paymentInfoBehaviourService = new BehaviorSubject<any>(this.paymentInfo);
        this.ordersInfoBehaviourSubject = new BehaviorSubject<any>(this.orders);

        this.userBehaviorSubject.next(this.tempUser);
    }

    /**
     * Makes a post request to login.php end point to sign in.
     * @param email 
     * @param password 
     */
    public userlogin(email, password) {
        return this.httpClient.post(this.baseUrl + '/login.php', { 'email': email, 'password': password });
    }

    /**
     * Takes an object with fullName, email and password as parameters and makes a post request to register.php endpoint to register a new user.
     * @param param0 
     */
    registerUser({fullName, email, password, phoneNumber, address, postal}) {
        return this.httpClient.post(this.baseUrl + '/register.php', {'fullName': fullName, 'email': email, 'password': password, 'phoneNumber': phoneNumber, 'address': address, 'postal': postal});
    }

    /**
     * Logs out the user and updates the behaviour subjects to inform other components that the user has signed out and reset the components.
     */
    logout() {
        this.userBehaviorSubject.next(
            {
                id: 0,
                fullName: '',
                pwd: '',
                email: '',
                phoneNumber: '',
                address: '',
                postal: '',
                balance: 0
            }
        );
        this.paymentInfoBehaviourService.next(
            {orderId: '',
            userId: '',
            productId: '',
            qty: '',
            orderTimestamp: '',
            credit_card_number: '',
            credit_card_holder: '',
            expiry_month: '',
            expiry_year: '', 
            credit_card_first_name: '', 
            credit_card_last_name: '', 
            credit_card_address_line_1: '', 
            credit_card_address_line_2: '', 
            country: '', 
            province: '', 
            city: '', 
            postal_code: ''}
        );
        this.userFavoritesBehaviourSubject.next([]);
        this.isLoggedInBehvaiourSubject.next(false);

    }

    /**
     * Returns the cars that we have for ride services.
     */
    getCars() {
        return this.httpClient.get(this.baseUrl + '/car/read.php');
    }

    /**
     * Takes in userId and productId and makes post request to removeFromFavorites.php to remove the product from the user's list of favorite products.
     * @param userId 
     * @param productId 
     */
    removeFromFavorites(userId, productId) {
        return this.httpClient.post(this.baseUrl + '/removeFromFavorites.php', { 'userId': `${userId}`, 'productId': `${productId}` });
    }

    /**
     * Takes in productId and makes a post request to 'productImages.php' to get an array of images for that particular product.
     * @param productId 
     */
    getImages(productId) {
        return this.httpClient.post(this.baseUrl + '/productImages.php', {'productId': productId});
    }

    /**
     * Gets the cartItems cookie that contains the products that user has added to cart and parses the object as JSON.
     */
    getCartItems() {
        return JSON.parse(localStorage.getItem("cartItems"));
    }

    updateCartListFromLocal() {
        const localCartItems: Order[] = this.getCartItems();
        this.cartItems = localCartItems;
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
        let tmpOrderObj: Order = {Car: {CarId: order.Car.CarId, CarColour: order.Car.CarColour, CarModel: order.Car.CarModel, ImageURL: order.Car.ImageURL}, UserId: 1, PickupDate: order.PickupDate, PickupTime: order.PickupTime, TotalFare: order.TotalFare, 
            Distance: order.direction.routes[0].legs[0].distance.text, Duration: order.direction.routes[0].legs[0].duration.text, StartAddress: order.direction.routes[0].legs[0].start_address,
            EndAddress: order.direction.routes[0].legs[0].end_address, StartLocationLat: order.direction.routes[0].legs[0].start_location.lat, StartLocationLng: order.direction.routes[0].legs[0].start_location.lng,
            EndLocationLat: order.direction.routes[0].legs[0].end_location.lat, EndLocationLng: order.direction.routes[0].legs[0].end_location.lng, Direction: order.direction};

        let isOrderPresent = this.cartItems.includes(tmpOrderObj);

        if (!isOrderPresent) {
            this.cartItems.push(tmpOrderObj);
            this.cartItemsBehaviourSubject.next(this.cartItems);
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
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
        return this.httpClient.post(this.baseUrl + '/sendInquiryForm.php', formData);
    }

    /**
     * Takes in userId and makes a post request to 'getPaymentInfo.php' to get the payment info on the last order of the user.
     * @param userId 
     */
    getPaymentInfo(userId) {
        return this.httpClient.post(this.baseUrl + '/getPaymentInfo.php', { "userId":userId });
    }

    /**
     * Takes in userId and makes a post request to 'getOrders.php' to get the past orders of the user.
     * @param userId 
     */
    getOrders(userId) {
        return this.httpClient.post(this.baseUrl + '/getOrders.php', {"userId":userId});
    }

    createOrder(data) {
        console.log({"PaymentId": 1, "CarId": data.order[0].Car.CarId, "TripId": "1", "TotalFare": data.order[0].TotalFare, "PickupDate": data.order[0].PickupDate, "PickupTime": data.order[0].PickupTime});
        return this.httpClient.post(this.baseUrl + '/rideServicesOrder/create.php', {"PaymentId": 1, "CarId": data.order[0].Car.CarId, "TripId": "1", "TotalFare": data.order[0].TotalFare, "PickupDate": data.order[0].PickupDate, "PickupTime": data.order[0].PickupTime});
    }

    /**
     * Takes in userId and productId and makes a post request to 'addFavorite.php' to insert the record into favorites table.
     * @param userId 
     * @param productId 
     */
    addFavorite(userId, productId) {
        return this.httpClient.post(this.baseUrl + '/addFavorite.php', {"userId":userId,"productId":productId});
    }

    /**
     * Takes in userId and makes a post request to 'getFavorites.php' to get the favorite products of the user.
     * @param userId 
     */
    getFavorites(userId) {
        return this.httpClient.post(this.baseUrl + '/getFavorites.php', {"userId":userId});
    }

    /**
     * Takes in userId and makes a post request to 'getFavoriteProducts.php' to get the favorite products of the user.
     * @param userId 
     */
    getFavoriteProducts(userId) {
        return this.httpClient.post(this.baseUrl + '/getFavoriteProducts.php', { "userId":userId });
    }

    /**
     * Returns a new behaviour subject on loggedIn boolean to inform other components when the user logs in.
     */
    isLoggedIn() {
        return new BehaviorSubject<any>(this.loggedIn);
    }
}













