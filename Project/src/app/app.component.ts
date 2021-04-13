import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ModalService } from './shared/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { BrowserInfoDialog } from './browser-info-dialog/browser-info-dialog.component';
import { DataService } from './shared/data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cps630-project';

  constructor(private modalService: ModalService, private dialog: MatDialog, private dataService: DataService, private cookieService: CookieService) { }

  @ViewChild('sidenav') sidenav: MatSidenav;
  handleOpenCart() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    const dialogRef = this.dialog.open(BrowserInfoDialog, {
      panelClass: 'custom-dialog-container',
      width: '550px',
      height: '200px'
    });

    this.dataService.loginFromCookie();
  }
}


