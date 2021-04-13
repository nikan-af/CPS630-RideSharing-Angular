import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginAlertComponent } from 'src/app/login-alert/login-alert.component';
import { MatPaginator } from '@angular/material/paginator';
import { RecordUpdateDialogComponent } from '../record-update-dialog/record-update-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-trip-maintain',
  templateUrl: './trip-maintain.component.html',
  styleUrls: ['./trip-maintain.component.css']
})
export class TripMaintainComponent implements OnInit {

  dataSource;
  tblColumns = [];
  tblData = [];

  trip = {
    TripId: '',
    OrderId: '',
    Distance: '',
    Duration: '',
    StartAddress: '',
    EndAddress: '',
    StartLocationLat: '',
    StartLocationLng: '',
    EndLocationLat: '',
    EndLocationLng: '',
    CarId: '',
    DriverId: ''
  };

  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['TripId', 'OrderId', 'Distance', 'Duration', 'StartAddress', 'EndAddress', 'StartLocationLat', 'StartLocationLng', 'EndLocationLat', 'EndLocationLng', 'CarId', 'DriverId', 'delete', 'update'];

  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog, private toastr: ToastrService, private cookieSevice: CookieService) { }

  ngOnInit(): void {
    this.dataService.isLoggedOut();    
    this.updateRecords();
  }

  addRecord(tblName, primaryKey): void {
    this.trip.TripId = this.tblData.length > 0 ? `${parseInt(this.tblData[this.tblData.length-1]['TripId']) + 1}` : '1';

    const dialogRef = this.dialog.open(RecordUpdateDialogComponent, {
      width: '600px',
      height: '500px',
      data: { 'tblName': tblName, 'primaryKey': primaryKey, 'formData': this.trip, 'operationType': 'insert', 'disabledFields': ['TripId'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.message === 'success') {
        this.toastrSuccess('insert');
        this.updateRecords();
      } else if (result.message === 'fail') {
        this.toastrFail('insert');
      }
    });
  }

  deleteTrip(element) {
    this.dataService.deleteTrip(element.TripId).subscribe(
      success => {
        this.tblData.splice(this.tblData.indexOf(element), 1);
        this.dataSource = new MatTableDataSource<Object>(this.tblData);
        this.toastrSuccess('delete');
      }, fail => {
        console.log(fail);
        this.toastrFail('delete');
      }
    );
  }

  toastrSuccess(command) {
    this.toastr.success(`Trip was ${command}d.`);
  }

  toastrFail(command) {
    this.toastr.error(`Failed to ${command} the trip.`);
  }

  updateTrip(element, tblName, primaryKey) {
    const dialogRef = this.dialog.open(RecordUpdateDialogComponent, {
      width: '600px',
      height: '500px',
      data: { 'tblName': tblName, 'primaryKey': primaryKey, 'formData': element, 'operationType': 'update', 'disabledFields': ['TripId'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.message === 'success') {
        this.toastrSuccess('update');
      } else if (result.message === 'fail') {
        this.toastrFail('update');
      }
    });
  }

  updateRecords() {
    this.dataService.getTrips().subscribe(success => {
      console.log(success);
      this.tblData = [];
      this.tblData = success['records'];
      this.dataSource = new MatTableDataSource<Object>(this.tblData);
      this.dataSource.paginator = this.paginator;
    }, fail => {
      console.log(fail);
    });
  }

}

