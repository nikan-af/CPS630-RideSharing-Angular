import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/data.service';
import { LoginAlertComponent } from 'src/app/login-alert/login-alert.component';
import { UserInquiry } from 'src/app/shared/interfaces';
import { MessageReplyComponent } from './message-reply/message-reply.component';

@Component({
  selector: 'app-inquiry-maintain',
  templateUrl: './inquiry-maintain.component.html',
  styleUrls: ['./inquiry-maintain.component.css']
})
export class InquiryMaintainComponent implements OnInit {

  inquiries: UserInquiry[];

  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.isLoggedOut();    
    this.updateRecords();
  }

  openMessageDialog(inquiry) {
    const dialogRef = this.dialog.open(MessageReplyComponent, {
      data: {FName: inquiry.FName, LName: inquiry.LName,
        Email: inquiry.Email, TypeOfInquiry: inquiry.TypeOfInquiry, Message: inquiry.Message, InquiryId: inquiry.InquiryId}
    });
  }

  deleteInquiry(inquiry) {
    console.log(inquiry);
    this.dataService.deleteInquiry(inquiry.InquiryId).subscribe(
      success => {
        this.toastrSuccess('delete');
        this.updateRecords();
      }, fail => {
        this.toastrFail('delete');
      }
    )
  }

  toastrSuccess(command) {
    this.toastr.success(`Inquiry was ${command}d.`);
  }

  toastrFail(command) {
    this.toastr.error(`Failed to ${command} the inquiry.`);
  }

  updateRecords() {
    this.dataService.getInquiries().subscribe(
      success => {
        this.inquiries = success['records'] as UserInquiry[];
        console.log(this.inquiries);
      }, fail => {
        console.log(fail);
      }
    )
  }
}
