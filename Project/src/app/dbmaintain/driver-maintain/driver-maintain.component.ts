import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { MatDialog, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginAlertComponent } from 'src/app/login-alert/login-alert.component';
import { Driver } from 'src/app/shared/interfaces';
import { DriverDialogComponent } from './driver-dialog/driver-dialog.component';

@Component({
  selector: 'app-driver-maintain',
  templateUrl: './driver-maintain.component.html',
  styleUrls: ['./driver-maintain.component.css']
})
export class DriverMaintainComponent implements OnInit {

  drivers: Driver[];
  tempDriver = {
    DriverId: 0,
    FirstName: '',
    LastName: '',
    EnglishProficiency: '',
    DriverExperienceYears: 0,
    PlaysMusic: '',
    DrivingSpeed: '',
    Appearance: '',
    SocialPreferences: '',
    DriverRating: '',
    DriverPrice: '',
    ImageURL: ''
  };

  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataService.isLoggedOut();
    this.updateRecords();
  }

  toastrSuccess(command) {
    this.toastr.success(`Driver was ${command}d.`);
  }

  toastrFail(command) {
    this.toastr.error(`Failed to ${command} the driver.`);
  }

  updateRecords() {
    this.dataService.getDrivers().subscribe(success => {
      this.drivers = success['records'] as Driver[];
      console.log(this.drivers);
    }, fail => {
      console.log(fail);
    });
  }

  updateDriver(driver) {
    const dialogRef = this.dialog.open(DriverDialogComponent, {
      width: '500px',
      height: '600px',
      data: { ...driver, disabledFields: ['DriverId'], operationType: 'update' }
    });

    dialogRef.afterClosed().subscribe(
      success => {
        if (success.message === 'success') {
          this.toastrSuccess('update');
        } else {
          this.toastrFail('update');
        }

        this.updateRecords();
      }
    )
  }

  addDriver() {
    this.tempDriver.DriverId = this.drivers.length > 0 ? parseInt(`${this.drivers[this.drivers.length-1]['DriverId']}`) + 1 : 1;

    const dialogRef = this.dialog.open(DriverDialogComponent, {
      width: '500px',
      height: '600px',
      data: { ...this.tempDriver, disabledFields: ['DriverId'], operationType: 'insert' }
    });

    dialogRef.afterClosed().subscribe(
      success => {
        if (success.message === 'success') {
          this.toastrSuccess('insert');
        } else {
          this.toastrFail('insert');
        }

        this.updateRecords();
      }
    )
  }

  delete(driver, event) {
    event.stopPropagation();
    this.dataService.deleteDriver(driver.DriverId).subscribe(
      success => {
        this.toastrSuccess('delete');
        this.updateRecords();
      }, fail => {
        this.toastrFail('delete');
      }
    )
  }

}
