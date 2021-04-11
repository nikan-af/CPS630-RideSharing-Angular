import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-driver-dialog',
  templateUrl: './driver-dialog.component.html',
  styleUrls: ['./driver-dialog.component.css']
})
export class DriverDialogComponent implements OnInit {

  noImageURL = '../../../../assets/icons/no-image-available.png';
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DriverDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  getFieldNames() {
    return Object.keys(this.data).filter(key => key !== 'disabledFields' && key !== 'operationType');
  }

  resetForm() {
    this.dataService.getDriverByDriverId(this.data.DriverId).subscribe(
      success => {
        this.data.DriverId = success['records'][0]['DriverId'];
        this.data.FirstName = success['records'][0]['FirstName'];
        this.data.LastName = success['records'][0]['LastName'];
        this.data.EnglishProficiency = success['records'][0]['EnglishProficiency'];
        this.data.DriverExperienceYears = success['records'][0]['DriverExperienceYears'];
        this.data.PlaysMusic = success['records'][0]['PlaysMusic'];
        this.data.DrivingSpeed = success['records'][0]['DrivingSpeed'];
        this.data.Appearance = success['records'][0]['Appearance'];
        this.data.SocialPreferences = success['records'][0]['SocialPreferences'];
        this.data.DriverRating = success['records'][0]['DriverRating'];
        this.data.DriverPrice = success['records'][0]['DriverPrice'];
        this.data.ImageURL = success['records'][0]['ImageURL'];
      }, fail => {
        console.log(fail);
      }
    )
  }

  onClick() {
    let obs$: Observable<any>;
    if (this.data.operationType === 'update') {
      obs$ = this.dataService.updateDriver(this.data);
    } else if (this.data.operationType === 'insert') {
      obs$ = this.dataService.createDriver(this.data);
    }

    obs$.subscribe(
      success => {
        console.log(success);
        this.dialogRef.close({'message': 'success'});
      }, fail => {
        console.log(fail);
      }
    )
  }

}
