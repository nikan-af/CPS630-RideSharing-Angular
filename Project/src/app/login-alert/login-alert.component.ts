import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-login-alert',
  templateUrl: './login-alert.component.html',
  styleUrls: ['./login-alert.component.css']
})
export class LoginAlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginAlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService, private toastr: ToastrService, private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.dialogRef.close();
    this.modalService.open(this.dataService.loginRef);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
