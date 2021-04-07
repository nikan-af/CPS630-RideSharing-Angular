import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { UpdateDialogData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-store-update-dialog',
  templateUrl: './store-update-dialog.component.html',
  styleUrls: ['./store-update-dialog.component.css']
})
export class StoreUpdateDialogComponent implements OnInit {
  tempData;
  showUpdate = false;
  fieldNames = [];
  isAdd = false;
  productToUpdate = {};
  products = [];

  constructor(
    public dialogRef: MatDialogRef<StoreUpdateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService, private toastr: ToastrService) {
    this.tempData = { ...data };
    // this.fieldNames = Object.keys(this.tempData['formData']);
  }

  ngOnInit(): void {
    switch(this.tempData.storeName) {
      case 'Coffee':
        this.dataService.getCoffees().subscribe(
          success => {
            console.log(success['records']);
            this.products = success['records'];
          }
        );
        break;
      case 'Flower':
        this.dataService.getFlowers().subscribe(
          success => {
            console.log(success['records']);
            this.products = success['records'];
          }
        );
        break;
    }
  }

  updateProduct(product) {
    console.log(product);
    this.isAdd = false;
    this.fieldNames = Object.keys(product);
    this.productToUpdate = product;
    this.showUpdate = true;
  }

  addProduct() {
    this.isAdd = true;
    this.productToUpdate = {ProductId: 0, StoreCode: '', Name: '', Price: 0.00, ImageURL: ''};
    this.fieldNames = Object.keys(this.productToUpdate);
    this.showUpdate = true;
  }

  discard() {
    this.isAdd = false;
    this.productToUpdate = {ProductId: 0, StoreCode: '', Name: '', Price: 0.00, ImageURL: ''};
    this.fieldNames = Object.keys(this.productToUpdate);
    this.showUpdate = false;
  }

  update() {
    if (this.isAdd) {
      this.dataService.addProduct(this.productToUpdate, this.tempData.storeName).subscribe(
        success => {
          console.log(success);
          this.toastrSuccess('insert');
          this.products.push(this.productToUpdate);
          this.discard();
        }, fail => {
          console.log(fail);
          this.toastrSuccess('insert');
        }
      );
    } else {
      this.dataService.updateProduct(this.productToUpdate, this.tempData.storeName).subscribe(
        success => {
          console.log(success);
          this.toastrSuccess('update');
          this.discard();
        }, fail => {
          console.log(fail);
          this.toastrSuccess('update');
        }
      )
    }
  }

  delete(product) {
    this.dataService.deleteProduct(product, this.tempData.storeName).subscribe(
      success => {
        console.log(success);
        this.toastrSuccess('delete');
        this.discard();
        this.products.splice(this.products.findIndex(tmpProduct => tmpProduct.ProductId === product.ProductId), 1);
      }, fail => {
        console.log(fail);
        this.toastrFail('delete');
      }
    )
  }

  toastrSuccess(command) {
    this.toastr.success(`Product was ${command}d.`);
  }

  toastrFail(command) {
    this.toastr.error(`Failed to ${command} the product.`);
  }
}
