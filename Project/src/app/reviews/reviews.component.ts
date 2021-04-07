import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Review } from '../shared/interfaces';
import { ToastrService } from 'ngx-toastr';
import { min } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginAlertComponent } from '../login-alert/login-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input('serviceType') serviceType: string;
  showForm = false;
  reviewSuccess = false;
  review: Review = {
    FirstName: '',
    LastName: '',
    Rating: 0,
    Message: '',
    ServiceType: '',
    Timestamp: ''
  };
  reviews = [];

  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.dataService.tempUser.Email) {
      this.router.navigate(['/']);
      const dialogRef = this.dialog.open(LoginAlertComponent, {
        width: '400px',
        height: '150px'
      });
    }
    this.review.ServiceType = this.serviceType;
    this.dataService.getReviews().subscribe(
      success => {
        this.reviews = success['records'];
      }, fail => {
        console.log(fail);
      }
    )
  }

  showComment(starNumber) {
    this.showForm = true;
    this.review.Rating = starNumber;
  }

  submit() {
    const dateTime = this.getTimestamp();
    this.review.Timestamp = dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();
    this.dataService.createReview(this.review).subscribe(
      success => {
        this.reviewSuccess = true;
        this.reviews.push(this.review);
        this.toastr.success("We have received your review.");
      },
      fail => {
        this.toastr.error("Your review was not received.");
      }
    )
  }

  getTimestamp() {
    return new Date();
  }

  getArray(n) {
    return Array(parseInt(n));
  }
}
