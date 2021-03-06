import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginAlertComponent } from '../login-alert/login-alert.component';

@Component({
  selector: 'app-ride-green',
  templateUrl: './ride-green.component.html',
  styleUrls: ['./ride-green.component.css']
})
export class RideGreenComponent implements OnInit {
  reviews = [];
  rideServiceReviews = [];
  deliveryServiceReviews =[];
  rideGreenServiceReviews = [];
  rideSocialServiceReviews = [];

  servicesSelected = [];

  rideServicesAvg = 0;
  deliveryServicesAvg = 0;
  rideGreenServiceAvg = 0;
  rideSocialServiceAvg = 0;

  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.isLoggedOut();
    this.dataService.getReviews().subscribe(
      success => {
        this.reviews = success['records'];
        console.log(this.reviews);
        this.rideServiceReviews = this.reviews.filter(review => review.ServiceType === 'ride-services');
        this.deliveryServiceReviews = this.reviews.filter(review => review.ServiceType === 'delivery-services');
        this.rideGreenServiceReviews = this.reviews.filter(review => review.ServiceType === 'ride-green');
        this.rideSocialServiceReviews = this.reviews.filter(review => review.ServiceType === 'ride-social');

        this.rideServicesAvg = this.getAverageReview(this.rideServiceReviews);
        this.deliveryServicesAvg = this.getAverageReview(this.deliveryServiceReviews);
        this.rideGreenServiceAvg = this.getAverageReview(this.rideGreenServiceReviews);
        this.rideSocialServiceAvg = this.getAverageReview(this.rideSocialServiceReviews);
      }, fail => {
        console.log(fail);
      }
    )
  }

  getAverageReview(array) {
    console.log(array);
    let total = 0;
    let count = 0;
    array.forEach(review => {
      total += parseInt(review.Rating);
      count++;
    });

    if (total === 0) {
      return 5;
    }

    console.log(total);
    console.log(count);

    return total / count;
  }

  select(serviceName) {
    this.servicesSelected.push(serviceName);
  }

}
