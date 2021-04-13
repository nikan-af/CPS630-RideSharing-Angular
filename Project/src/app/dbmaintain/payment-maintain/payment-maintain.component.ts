import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginAlertComponent } from 'src/app/login-alert/login-alert.component';
import { MatPaginator } from '@angular/material/paginator';
import { RecordUpdateDialogComponent } from '../record-update-dialog/record-update-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-maintain',
  templateUrl: './payment-maintain.component.html',
  styleUrls: ['./payment-maintain.component.css']
})
export class PaymentMaintainComponent implements OnInit {

  dataSource;
  tblColumns = [];
  tblData = [];

  payment = {
    PaymentId: '',
    OrderId: '',
    CardNumber: '',
    ExpiryMonth: '',
    ExpiryYear: '',
    CardHolderFirstName: '',
    CardHolderLastName: '',
    CardAddressLine1: '',
    CardAddressLine2: '',
    PostalCode: '',
    City: '',
    StateOrProvince: '',
    Country: ''
  };

  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['PaymentId', 'OrderId', 'CardNumber', 'ExpiryMonth', 'ExpiryYear', 'CardHolderFirstName', 'CardHolderLastName', 'CardAddressLine1', 'CardAddressLine2', 'PostalCode', 'City', 'StateOrProvince', 'Country', 'delete', 'update'];

  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataService.isLoggedOut();
    this.updateRecords();
  }

  addRecord(tblName, primaryKey): void {
    this.payment.PaymentId = this.tblData.length > 0 ? `${parseInt(this.tblData[this.tblData.length-1]['PaymentId']) + 1}` : '1';

    const dialogRef = this.dialog.open(RecordUpdateDialogComponent, {
      width: '600px',
      height: '500px',
      data: { 'tblName': tblName, 'primaryKey': primaryKey, 'formData': this.payment, 'operationType': 'insert', 'disabledFields': ['PaymentId'] }
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

  deleteOrder(element) {
    this.dataService.deletePayment(element.PaymentId).subscribe(
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
    this.toastr.success(`Order was ${command}d.`);
  }

  toastrFail(command) {
    this.toastr.error(`Failed to ${command} the order.`);
  }

  updatePayment(element, tblName, primaryKey) {
    const dialogRef = this.dialog.open(RecordUpdateDialogComponent, {
      width: '600px',
      height: '500px',
      data: { 'tblName': tblName, 'primaryKey': primaryKey, 'formData': element, 'operationType': 'update', 'disabledFields': ['PaymentId'] }
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
    this.dataService.getPayments().subscribe(success => {
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
