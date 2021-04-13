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

    this.dataService.isUserAlreadyLoggedIn().subscribe(
      response => {
        this.dataService.userBehaviorSubject.next(
          {
            UserId: response['records'][0].UserId,
            Email: response['records'][0].Email,
            Name: response['records'][0].Name,
            Password: '',
            Tel: response['records'][0].Tel,
            Address: response['records'][0].Address,
            CityCode: response['records'][0].CityCode,
            Balance: response['records'][0].Balance,
            isAdmin: response['records'][0].isAdmin
          }
        );
        this.dataService.isLoggedInBehvaiourSubject.next(true);
        console.log(response);

        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() + 10);
        this.cookieService.set('rememberme', response['records'][0].cookie, dateNow);
      }
    );
  }
}


