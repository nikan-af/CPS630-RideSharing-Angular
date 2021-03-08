import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { UpdateDialogData } from 'src/app/shared/interfaces';

@Component({
  selector: 'record-update-dialog',
  styleUrls: ['./record-update-dialog.component.css'],
  templateUrl: './record-update-dialog.component.html'
})
export class RecordUpdateDialogComponent {
  tempData: UpdateDialogData;
  fieldNames;

  constructor(
    public dialogRef: MatDialogRef<RecordUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData, private dataService: DataService, private toastr: ToastrService) {
      this.tempData = {...data};
      this.fieldNames = Object.keys(this.tempData['formData']);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    if (this.tempData.operationType === 'insert') {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  updateRecord() {
    console.log(this.tempData);
    this.dataService.updateUser(this.tempData.formData).subscribe(
      success => {
        this.dialogRef.close('success');
      },
      fail => {
        this.dialogRef.close('fail');
      }
    );
  }

  insertRecord() {
    console.log(this.tempData);
    this.dataService.registerUser(this.tempData.formData).subscribe(
      success => {
        this.dialogRef.close({'message': 'success', data: this.tempData.formData});
      },
      fail => {
        this.dialogRef.close({'message': 'fail'});
      }
    );
  }

  resetForm() {
    this.dataService.getUserByUserId(this.data.formData['UserId']).subscribe(
      success => {
        this.tempData.formData['Password'] = success['records'][0]['Password'];
        this.tempData.formData['Name'] = success['records'][0]['Name'];
        this.tempData.formData['Tel'] = success['records'][0]['Tel'];
        this.tempData.formData['Email'] = success['records'][0]['Email'];
        this.tempData.formData['Address'] = success['records'][0]['Address'];
        this.tempData.formData['CityCode'] = success['records'][0]['CityCode'];
        this.tempData.formData['Balance'] = success['records'][0]['Balance'];
        this.tempData.formData['isAdmin'] = success['records'][0]['isAdmin'];
      },
      fail => {
        console.log(fail);
      }
    );
    this.tempData = this.data;
  }

}
