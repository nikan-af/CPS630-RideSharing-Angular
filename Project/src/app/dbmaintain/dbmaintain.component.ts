import { Component, OnInit, Injector, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import { RecordAddDialog } from '../add-record-dialog/add-record-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../shared/data.service';
import { RecordUpdateDialogComponent } from './record-update-dialog/record-update-dialog.component';
import { User } from '../shared/interfaces';
import { LoginAlertComponent } from '../login-alert/login-alert.component';

@Component({
  selector: 'app-dbmaintain',
  templateUrl: './dbmaintain.component.html',
  styleUrls: ['./dbmaintain.component.css']
})
export class DbmaintainComponent implements OnInit {
  dataSource;
  tblColumns = [];
  tblData = [];

  user = {
    Password: '',
    Name: '',
    Email: '',
    Balance: 0,
    isAdmin: 0,
    Address: '',
    CityCode: '',
    Tel: ''
  };

  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['UserId', 'Name', 'Email', 'Address', 'CityCode', 'Tel', 'Balance', 'isAdmin', 'delete', 'update'];

  constructor(private router: Router, private dataService: DataService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.isLoggedOut();
    this.updateRecords();
  }

  addRecord(tblName, primaryKey): void {
    const dialogRef = this.dialog.open(RecordUpdateDialogComponent, {
      width: '600px',
      height: '500px',
      data: { 'tblName': tblName, 'primaryKey': primaryKey, 'formData': this.user, 'operationType': 'insert' }
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

  deleteUser(element) {
    this.dataService.deleteUser(element.UserId).subscribe(
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
    this.toastr.success(`Record was ${command}d.`);
  }

  toastrFail(command) {
    this.toastr.error(`Failed to ${command} the record.`);
  }

  updateUser(element, tblName, primaryKey) {
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
    this.dataService.getUsers().subscribe(success => {
      this.tblData = [];
      this.tblData = success['records'];
      this.dataSource = new MatTableDataSource<Object>(this.tblData);
      this.dataSource.paginator = this.paginator;
    }, fail => {
      console.log(fail);
    });
  }
}


