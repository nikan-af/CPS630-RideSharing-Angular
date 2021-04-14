import { Component, OnInit, Injector, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import { RecordAddDialog } from '../add-record-dialog/add-record-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../shared/data.service';
import { RecordUpdateDialogComponent } from '../record-update-dialog/record-update-dialog.component';
import { User } from '../../shared/interfaces';

@Component({
  selector: 'app-login-attempt-maintain',
  templateUrl: './login-attempt-maintain.component.html',
  styleUrls: ['./login-attempt-maintain.component.css']
})
export class LoginAttemptMaintainComponent implements OnInit {

  dataSource;
  tblColumns = [];
  tblData = [];

  loginAttempt = {
    LoginAttemptId: 0,
    Email: '',
    IPAddress: '',
    InvalidCreds: 0,
    Timestamp: ''
  };

  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['LoginAttemptId', 'Email', 'IPAddress', 'InvalidCreds', 'Timestamp', 'delete'];

  constructor(private router: Router, private dataService: DataService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.isLoggedOut();
    this.updateRecords();
  }

  deleteLoginAttempt(element) {
    this.dataService.deleteLoginAttempt(element.LoginAttemptId).subscribe(
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

  updateRecords() {
    this.dataService.getLoginAttempts().subscribe(success => {
      this.tblData = [];
      this.tblData = success['records'];
      this.dataSource = new MatTableDataSource<Object>(this.tblData);
      this.dataSource.paginator = this.paginator;
    }, fail => {
      console.log(fail);
    });
  }

}
