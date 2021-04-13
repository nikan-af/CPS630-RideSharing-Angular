import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { UpdateDialogData } from 'src/app/shared/interfaces';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'record-update-dialog',
  styleUrls: ['./record-update-dialog.component.css'],
  templateUrl: './record-update-dialog.component.html'
})
export class RecordUpdateDialogComponent {
  tempData: UpdateDialogData;
  fieldNames;

  constructor(
    public dialogRef: MatDialogRef<RecordUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData, private dataService: DataService, private toastr: ToastrService) {
    this.tempData = { ...data };
    console.log(this.tempData);
    this.fieldNames = Object.keys(this.tempData['formData']);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    if (this.tempData.operationType === 'insert') {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  updateRecord() {
    let obs$: Observable<any>;

    switch (this.tempData.tblName) {
      case 'User':
        obs$ = this.dataService.updateUser(this.tempData.formData);
        break;
      case 'Order':
        obs$ = this.dataService.updateOrder({ OrderId: this.tempData.formData['OrderId'], UserId: this.tempData.formData['UserId'], OrderTotal: this.tempData.formData['OrderTotal'], Timestamp: this.tempData.formData['Timestamp'] });
        break;
      case 'Payment':
        obs$ = this.dataService.updatePayment({ PaymentId: this.tempData.formData['PaymentId'], OrderId: this.tempData.formData['OrderId'], CardNumber: this.tempData.formData['CardNumber'], ExpiryMonth: this.tempData.formData['ExpiryMonth'], ExpiryYear: this.tempData.formData['ExpiryYear'], CardHolderFirstName: this.tempData.formData['CardHolderFirstName'], CardHolderLastName: this.tempData.formData['CardHolderLastName'], CardAddressLine1: this.tempData.formData['CardAddressLine1'], CardAddressLine2: this.tempData.formData['CardAddressLine2'], PostalCode: this.tempData.formData['PostalCode'], City: this.tempData.formData['City'], StateOrProvince: this.tempData.formData['StateOrProvince'], Country: this.tempData.formData['Country'] });
        break;
      case 'Trip':
        obs$ = this.dataService.updateTrip({ TripId: this.tempData.formData['TripId'], OrderId: this.tempData.formData['OrderId'], Distance: this.tempData.formData['Distance'], Duration: this.tempData.formData['Duration'], StartAddress: this.tempData.formData['StartAddress'], EndAddress: this.tempData.formData['EndAddress'], StartLocationLat: this.tempData.formData['StartLocationLat'], StartLocationLng: this.tempData.formData['StartLocationLng'], EndLocationLat: this.tempData.formData['EndLocationLat'], EndLocationLng: this.tempData.formData['EndLocationLng'], CarId: this.tempData.formData['CarId'], DriverId: this.tempData.formData['DriverId'] });
        break;
    }

    if (obs$) {
      obs$.subscribe(
        success => {
          this.dialogRef.close({ 'message': 'success', data: this.tempData.formData });
        },
        fail => {
          this.dialogRef.close({ 'message': 'fail' });
        }
      );
    }
  }

  insertRecord() {
    console.log(this.tempData);
    let obs$: Observable<any>;

    switch (this.tempData.tblName) {
      case 'User':
        obs$ = this.dataService.registerUser(this.tempData.formData);
        break;
      case 'Order':
        obs$ = this.dataService.createOrder({ OrderId: this.tempData.formData['OrderId'], UserId: this.tempData.formData['UserId'], OrderTotal: this.tempData.formData['OrderTotal'], Timestamp: this.tempData.formData['Timestamp'] });
        break;
      case 'Payment':
        obs$ = this.dataService.createPayment({ PaymentId: this.tempData.formData['PaymentId'], OrderId: this.tempData.formData['OrderId'], CardNumber: this.tempData.formData['CardNumber'], ExpiryMonth: this.tempData.formData['ExpiryMonth'], ExpiryYear: this.tempData.formData['ExpiryYear'], CardHolderFirstName: this.tempData.formData['CardHolderFirstName'], CardHolderLastName: this.tempData.formData['CardHolderLastName'], CardAddressLine1: this.tempData.formData['CardAddressLine1'], CardAddressLine2: this.tempData.formData['CardAddressLine2'], PostalCode: this.tempData.formData['PostalCode'], City: this.tempData.formData['City'], StateOrProvince: this.tempData.formData['StateOrProvince'], Country: this.tempData.formData['Country'] });
        break;
      case 'Trip':
        obs$ = this.dataService.createTrip({ TripId: this.tempData.formData['TripId'], OrderId: this.tempData.formData['OrderId'], Distance: this.tempData.formData['Distance'], Duration: this.tempData.formData['Duration'], StartAddress: this.tempData.formData['StartAddress'], EndAddress: this.tempData.formData['EndAddress'], StartLocationLat: this.tempData.formData['StartLocationLat'], StartLocationLng: this.tempData.formData['StartLocationLng'], EndLocationLat: this.tempData.formData['EndLocationLat'], EndLocationLng: this.tempData.formData['EndLocationLng'], CarId: this.tempData.formData['CarId'], DriverId: this.tempData.formData['DriverId'] });
        break;
    }

    if (obs$) {
      obs$.subscribe(
        success => {
          this.dialogRef.close({ 'message': 'success', data: this.tempData.formData });
          this.resetForm();
        },
        fail => {
          this.dialogRef.close({ 'message': 'fail' });
        }
      );
    }
  }

  resetForm() {
    switch (this.data.tblName) {
      case 'User':
        this.dataService.getUserByUserId(this.data.formData['UserId']).subscribe(
          success => {
            this.tempData.formData['Password'] = success['records'][0]['Password'];
            this.tempData.formData['Name'] = success['records'][0]['Name'];
            this.tempData.formData['Tel'] = success['records'][0]['Tel'];
            this.tempData.formData['Email'] = success['records'][0]['Email'];
            this.tempData.formData['Address'] = success['records'][0]['Address'];
            this.tempData.formData['CityCode'] = success['records'][0]['CityCode'];
            this.tempData.formData['Balance'] = success['records'][0]['Balance'];
            this.tempData.formData['isAdmin'] = success['records'][0]['isAdmin'];
            this.tempData.formData['Salt'] = success['records'][0]['Salt'];
            this.tempData.formData['Token'] = success['records'][0]['Token'];
          },
          fail => {
            console.log(fail);
          }
        );
        break;
      case 'Order':
        this.dataService.getOrderByOrderId(this.data.formData['OrderId']).subscribe(
          success => {
            this.tempData.formData['OrderId'] = success['records'][0]['OrderId'];
            this.tempData.formData['UserId'] = success['records'][0]['UserId'];
            this.tempData.formData['OrderTotal'] = success['records'][0]['OrderTotal'];
            this.tempData.formData['Timestamp'] = success['records'][0]['Timestamp'];
          },
          fail => {
            console.log(fail);
          }
        );
        break;
      case 'Payment':
        this.dataService.getPaymentByPaymentId(this.data.formData['PaymentId']).subscribe(
          success => {
            this.tempData.formData['PaymentId'] = success['records'][0]['PaymentId'];
            this.tempData.formData['OrderId'] = success['records'][0]['OrderId'];
            this.tempData.formData['CardNumber'] = success['records'][0]['CardNumber'];
            this.tempData.formData['ExpiryMonth'] = success['records'][0]['ExpiryMonth'];
            this.tempData.formData['ExpiryYear'] = success['records'][0]['ExpiryYear'];
            this.tempData.formData['CardHolderFirstName'] = success['records'][0]['CardHolderFirstName'];
            this.tempData.formData['CardHolderLastName'] = success['records'][0]['CardHolderLastName'];
            this.tempData.formData['CardAddressLine1'] = success['records'][0]['CardAddressLine1'];
            this.tempData.formData['CardAddressLine2'] = success['records'][0]['CardAddressLine2'];
            this.tempData.formData['PostalCode'] = success['records'][0]['PostalCode'];
            this.tempData.formData['City'] = success['records'][0]['City'];
            this.tempData.formData['StateOrProvince'] = success['records'][0]['StateOrProvince'];
            this.tempData.formData['Country'] = success['records'][0]['Country'];
          },
          fail => {
            console.log(fail);
          }
        );
        break;
      case 'Trip':
        this.dataService.getTripByTripId(this.data.formData['TripId']).subscribe(
          success => {
            this.tempData.formData['TripId'] = success['records'][0]['TripId'];
            this.tempData.formData['OrderId'] = success['records'][0]['OrderId'];
            this.tempData.formData['Distance'] = success['records'][0]['Distance'];
            this.tempData.formData['Duration'] = success['records'][0]['Duration'];
            this.tempData.formData['StartAddress'] = success['records'][0]['StartAddress'];
            this.tempData.formData['EndAddress'] = success['records'][0]['EndAddress'];
            this.tempData.formData['StartLocationLat'] = success['records'][0]['StartLocationLat'];
            this.tempData.formData['StartLocationLng'] = success['records'][0]['StartLocationLng'];
            this.tempData.formData['EndLocationLat'] = success['records'][0]['EndLocationLat'];
            this.tempData.formData['EndLocationLng'] = success['records'][0]['EndLocationLng'];
            this.tempData.formData['CarId'] = success['records'][0]['CarId'];
            this.tempData.formData['DriverId'] = success['records'][0]['DriverId'];
          }, fail => {
            console.log(fail);
          }
        );
        break;
    }

    this.tempData = this.data;
  }

}
