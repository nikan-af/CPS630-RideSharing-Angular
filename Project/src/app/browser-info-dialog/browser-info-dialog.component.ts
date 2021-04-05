import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browser-info-dialog',
  templateUrl: './browser-info-dialog.component.html',
  styleUrls: ['./browser-info-dialog.component.css']
})
export class BrowserInfoDialog implements OnInit {
  browserName: string = '';
  browserField: string = '';
  appCodeName: string = '';
  appVersion: string = '';
  userAgent: string = '';

  constructor() { }

  ngOnInit(): void {
    this.appCodeName = window.navigator.appCodeName;
    this.appVersion = window.navigator.appVersion;
    this.userAgent = window.navigator.userAgent;

    if (window.navigator.vendor === 'Google Inc.') {
      this.browserName = 'Google Chrome';
    } else if (window.navigator.vendor === 'Apple Computer, Inc.' && window.navigator.userAgent.toLowerCase().indexOf("safari") !== -1) {
      this.browserName = 'Apple Safari';
    } else if (window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
      this.browserName = 'Mozilla Firefox';
    } else if (window.navigator.userAgent.toLowerCase().indexOf('edge') > -1 || window.navigator.userAgent.toLowerCase().indexOf('edg') > -1) {
      this.browserName = 'Edge';
    }

    console.log(this.browserName);
  }

}
