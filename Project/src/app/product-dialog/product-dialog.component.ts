import { Component, OnInit, Input, Inject } from '@angular/core';
import { DataService } from '../shared/data.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../shared/modal.service';
import { CookieService } from 'ngx-cookie-service';
import { ProductDialogData } from '../delivery-services/delivery-services.component';

@Component({
    selector: 'product-dialog-component',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

    product: ProductDialogData;
    images: any;
    productDetails;
    loading = true;
    itemAlreadyAdded = false;
    size = 's';
    qty = 1;
    cartItems = [];
    user;

    constructor(private dataService: DataService, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ProductDialogData, private modalSerivce: ModalService) {
        this.cartItems = this.dataService.getCartItems();

        // Gets the user information to see if the user is logged in
        this.dataService.userBehaviorSubject.subscribe(
            success => {
                this.user = success;
            }
        )
    }

    ngOnInit() {
        this.product = this.data;
        console.log(this.product);
        // Gets product images using the productId of the product object passed into the dialog (i.e. this.data)
        // this.dataService.getImages(this.product.productId).subscribe(
        //     success => {
        //         this.images = success;
        //         this.productDetails = JSON.parse(this.product.description);
        //         this.loading = false;
        //     }, fail => {
        //         console.log(fail);
        //     }
        // )
    }

    addToOrder() {
        this.dialogRef.close({...this.product, 'Qty': this.qty, 'Size': this.size});
    }
}