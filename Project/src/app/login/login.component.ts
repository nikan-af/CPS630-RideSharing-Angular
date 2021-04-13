import { Component, Input, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from '../shared/modal.service';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service'
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/interfaces';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  exportAs: 'modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  keepMeLoggedIn = false;
  suspiciousActivity = false;
  remainingAttempts = 5;

  @Input() content: ElementRef;

  // Once the user logs in emits the event to the parent component.
  @Output() userStatus: EventEmitter<any> = new EventEmitter();

  constructor(private dataService: DataService, private toastr: ToastrService, private modalService: ModalService, private cookieService: CookieService) {
  }

  ngOnInit() {
    console.log('here');
  }

  tempUser: User = {
    UserId: 0,
    Name: '',
    Email: '',
    Password: '',
    Tel: '',
    Address: '',
    CityCode: '',
    Balance: 0,
    isAdmin: 0,
    Blocked: 0
  };

  signUpSelected = false;
  userWasCreated = false;
  userIsValid = false;
  userIsLoggedIn = false;
  userHasSignedUp = false;
  displayAdditionalInfo = false;

  // Regex used for email validation.
  emailRX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  postalCodeRX = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

  // Changes the form tab from sign in to sign up and vice versa
  changeTab() {
    this.signUpSelected = !this.signUpSelected;
  }

  onNext() {
    this.displayAdditionalInfo = true;
  }

  onGoBack() {
    this.displayAdditionalInfo = false;
  }

  /**
   * gets the form data and checks whether the user is trying to signup or sign in 
   * if sign in it will get the result and send the data to the php backend endpoint for registration and if login to login endpoint.
   * @param form 
   */
  onSubmit(form) {
    console.log(form);
    if (form.value.passwordSignUp) {
      this.dataService.registerUser({ 'Name': form.value.fullName, 'Email': form.value.emailSignUp, 'Password': form.value.passwordSignUp , 'Tel': form.value.phone, 'Address': form.value.address, 'CityCode': form.value.postal}).subscribe(
        success => {
          this.userWasCreated = true;
          this.userHasSignedUp = true;
          this.dataService.isLoggedInBehvaiourSubject.next(false);
        },
        fail => {
          console.log(fail);
        }
      );
    } else {
      /*
        Once the user logs in we set all the behavior subjects set on user, paymentinfo, orders and favorites to inform other components that 
        the user has logged and we then fetch the data for paymentInfo, favorites and orders using the if of the user.
      */
     console.log(this.keepMeLoggedIn);
      this.dataService.userlogin(this.tempUser.Email, this.tempUser.Password, this.keepMeLoggedIn).subscribe(
        response => {
          this.dataService.userBehaviorSubject.next(
            {
              UserId: response['records'][0].UserId,
              Email: response['records'][0].Email,
              Name: response['records'][0].Name,
              Password: '',
              Tel: response['records'][0].Tel,
              Address: response['records'][0].Address,
              CityCode: response['records'][0].CityCode,
              Balance: response['records'][0].Balance,
              isAdmin: response['records'][0].isAdmin,
              Blocked: response['records'][0].Blocked
            }
          );

          if (this.keepMeLoggedIn) {
            const dateNow = new Date();
            dateNow.setMinutes(dateNow.getMinutes() + 10);
            this.cookieService.set('rememberme', response['records'][0].cookie, dateNow);
          }
          // this.dataService.getPaymentInfo(response['records'][0].userId).subscribe(
          //   success => {
          //     this.dataService.paymentInfoBehaviourService.next(success[0]);
          //   }, fail => {
          //     console.log(fail);
          //   }
          // )
          // this.dataService.getOrders(response['records'][0].userId).subscribe(
          //   success => {
          //     this.dataService.ordersInfoBehaviourSubject.next(success);
          //   }, fail => {
          //     console.log(fail);
          //   }
          // )
          this.userStatus.emit('loggedIn');
          this.userIsLoggedIn = true;
          this.dataService.isLoggedInBehvaiourSubject.next(true);
          this.modalService.close(this.content);
          this.toastr.success("Hello " + response['records'][0].Name + ", you are logged in!");
        },
        fail => {
          if (fail.error.message === 'Locked') {
            console.log('here');
            this.suspiciousActivity = true;
          } else if (fail.error.remainingAttempts) {
            this.remainingAttempts = fail.error.remainingAttempts;
            console.log(fail.error.remainingAttempts);
          }
          console.log(fail);
        }
      );
    }
  }
}
