import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Order, Driver } from '../shared/interfaces';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginAlertComponent } from '../login-alert/login-alert.component';

@Component({
  selector: 'app-ride-social',
  templateUrl: './ride-social.component.html',
  styleUrls: ['./ride-social.component.css']
})
export class RideSocialComponent implements OnInit {

  driverObj = {
    EnglishProficiency: '',
    DriverExperienceYears: '',
    PlaysMusic: '',
    DrivingSpeed: '',
    Appearance: '',
    SocialPreferences: '',
    DriverRating: ''
  };

  drivers = [];

  selectedDriverId = -1;
  noDriversFound = false;

  filteredDrivers = [];
  constructor(private dialog: MatDialog, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.isLoggedOut();
    this.dataService.getDrivers().subscribe(
      data => {
        this.drivers = data['records'];
        this.filteredDrivers = this.drivers;
      }, fail => {
        console.log(fail);
      }
    );
  }

  findDriver() {
    let tmpDrivers = this.drivers;
    console.log(this.drivers);
    Object.keys(this.driverObj).filter(key => {
      tmpDrivers = tmpDrivers.filter(driver => driver[key] == this.driverObj[key] || (this.driverObj[key] === '' || this.driverObj[key] === 0) || (parseFloat(this.driverObj['DriverRating']) > 0 && parseFloat(driver.DriverRating) >= parseFloat(this.driverObj['DriverRating'])));
    });
    console.log(this.driverObj);
    if (tmpDrivers.length === 0) {
      this.filteredDrivers = this.drivers;
      this.resetForm();
      console.log('here');
      this.noDriversFound = true;
    } else {
      this.noDriversFound = false;
      this.filteredDrivers = tmpDrivers;
    }
    console.log(tmpDrivers);
  }

  resetForm() {
    this.noDriversFound = false;
    this.driverObj = {
      EnglishProficiency: '',
      DriverExperienceYears: '',
      PlaysMusic: '',
      DrivingSpeed: '',
      Appearance: '',
      SocialPreferences: '',
      DriverRating: ''
    };
  }

  selectDriver(DriverId: number) {
    this.selectedDriverId = this.filteredDrivers.findIndex(driver => driver.DriverId === DriverId );
    console.log(this.selectedDriverId);
  }
}
