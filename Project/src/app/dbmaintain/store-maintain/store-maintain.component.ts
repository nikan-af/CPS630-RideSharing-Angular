import { Component, OnInit, Injector, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import { RecordAddDialog } from '../add-record-dialog/add-record-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../shared/data.service';
import { RecordUpdateDialogComponent } from '../record-update-dialog/record-update-dialog.component';
import { StoreUpdateDialogComponent } from '../store-update-dialog/store-update-dialog.component';

@Component({
  selector: 'app-store-maintain',
  templateUrl: './store-maintain.component.html',
  styleUrls: ['./store-maintain.component.css']
})
export class StoreMaintainComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  updateStore(storeName) {
    console.log(storeName);

    const dialogRef = this.dialog.open(StoreUpdateDialogComponent, {
      width: '1000px',
      height: '700px',
      data: {'storeName': storeName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        // this.toastrSuccess('update');
      } else if (result === 'fail') {
        // this.toastrFail('update');
      }
    });
  }
}
