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
  selector: 'app-order-maintain',
  templateUrl: './order-maintain.component.html',
  styleUrls: ['./order-maintain.component.css']
})
export class OrderMaintainComponent implements OnInit {

  dataSource;
  tblColumns = [];
  tblData = [];

  order = {
    OrderId: '',
    UserId: '',
    OrderTotal: '',
    Timestamp: ''
  };

  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['OrderId', 'UserId', 'OrderTotal', 'Timestamp', 'delete', 'update'];

  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (!this.dataService.tempUser.Email) {
      this.router.navigate(['/']);
      const dialogRef = this.dialog.open(LoginAlertComponent, {
        width: '400px',
        height: '150px'
      });
    }

    this.updateRecords();
  }

  addRecord(tblName, primaryKey): void {
    const dateTime = new Date();
    this.order.Timestamp = dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();
    this.order.OrderId = this.tblData.length > 0 ? `${parseInt(this.tblData[this.tblData.length-1]['OrderId']) + 1}` : '1';

    const dialogRef = this.dialog.open(RecordUpdateDialogComponent, {
      width: '600px',
      height: '500px',
      data: { 'tblName': tblName, 'primaryKey': primaryKey, 'formData': this.order, 'operationType': 'insert', 'disabledFields': ['OrderId', 'Timestamp'] }
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
    this.dataService.deleteOrder(element.OrderId).subscribe(
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

  updateOrder(element, tblName, primaryKey) {
    const dialogRef = this.dialog.open(RecordUpdateDialogComponent, {
      width: '600px',
      height: '500px',
      data: { 'tblName': tblName, 'primaryKey': primaryKey, 'formData': element, 'operationType': 'update' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.toastrSuccess('update');
      } else if (result === 'fail') {
        this.toastrFail('update');
      }
    });
  }

  updateRecords() {
    this.dataService.getOrders().subscribe(success => {
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
