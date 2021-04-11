import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'message-reply',
  templateUrl: './message-reply.component.html',
  styleUrls: ['./message-reply.component.css']
})
export class MessageReplyComponent implements OnInit {
  FName;
  LName;
  Email;
  Message;
  Response;
  emailSent;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<MessageReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.FName = this.data.FName;
    this.LName = this.data.LName;
    this.Email = this.data.Email;
    this.Message = this.data.Message;
  }

  sendMessage() {
    this.dialogRef.close();
    this.toastr.success('Email was sent.');
  }
}
