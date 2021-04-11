import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Review } from '../../shared/interfaces';
import { ToastrService } from 'ngx-toastr';
import { min } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginAlertComponent } from '../../login-alert/login-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-reviews-maintain',
  templateUrl: './reviews-maintain.component.html',
  styleUrls: ['./reviews-maintain.component.css']
})
export class ReviewsMaintainComponent implements OnInit {

  reviews = [];
  rideServiceReviews = [];
  deliveryServiceReviews = [];
  rideGreenServiceReviews = [];
  rideSocialServiceReviews = [];

  filteredReviews = {
    'ride-services': [],
    'delivery-services': [],
    'ride-green': [],
    'ride-social': []
  };

  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.dataService.tempUser.Email) {
      this.router.navigate(['/']);
      const dialogRef = this.dialog.open(LoginAlertComponent, {
        width: '400px',
        height: '150px'
      });
    }
    this.dataService.getReviews().subscribe(
      success => {
        this.reviews = success['records'];
        console.log(this.reviews);
        this.getFilteredReviews();
      }, fail => {
        console.log(fail);
      }
    )
  }

  getArray(n) {
    return Array(parseInt(n));
  }

  getFilteredReviews() {
    this.filteredReviews = {
      'ride-services': [],
      'delivery-services': [],
      'ride-green': [],
      'ride-social': []
    };
    this.reviews.forEach(review => {
      this.filteredReviews[`${review.ServiceType}`].push(review);
    });
  }

  getFilteredReviewsObjKeys() {
    return Object.keys(this.filteredReviews);
  }

  onDelete(ReviewId) {
    console.log(ReviewId);
    this.dataService.deleteReview(ReviewId).subscribe(
      success => {
        this.toastrSuccess('delete');
        this.reviews.splice(this.reviews.findIndex(review => review.ReviewId === ReviewId), 1);
        this.getFilteredReviews();
      }, fail => {
        this.toastrFail('delete');
      }
    )
  }

  toastrSuccess(command) {
    this.toastr.success(`Review was ${command}d.`);
  }

  toastrFail(command) {
    this.toastr.error(`Failed to ${command} the review.`);
  }

}
