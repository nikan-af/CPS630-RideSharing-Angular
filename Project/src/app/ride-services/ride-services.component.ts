import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../shared/data.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { ModalService } from '../shared/modal.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'ride-services-component',
    templateUrl: './ride-services.component.html',
    styleUrls: ['./ride-services.component.css']
})
export class RideServicesComponent implements OnInit {

    cars: any;
    cartItems = [];
    loading = true;
    user;

    constructor(private toastr: ToastrService, private dataService: DataService, private dialog: MatDialog, private modalService: ModalService, private cookieService: CookieService) {
        this.cartItems = JSON.parse(this.cookieService.get("cartItems"));
    }

    ngOnInit() {
        // Gets the cars from the back-end by making a get request.
        this.dataService.getCars().subscribe(
            success => {
                console.log(success);
                this.cars = success;
                this.loading = false;
            }, fail => {
                console.log(fail);
            }
        )

        // Sets behaviour subject on user data so that in case the user logs in or out the code block gets executed.
        this.dataService.userBehaviorSubject.subscribe(
            success => {
                this.user = success;
                this.loading = true;
            }
        );
    }

    /**
     * Opens the car-dialog.component and passes in the car item so that the details can be used on the dialog
     * @param car 
     */
    openProductDialog(car) {
        const dialogRef = this.dialog.open(CarDialogComponent, {
            panelClass: 'custom-dialog-container',
            width: '600px',
            height: '800px',
            data: car
        });
    }
}

/* The interface used for the object that gets passed into the car dialog */
export interface CarDialogData {
    CarId: string;
    CarModel: string;
    CarCode: string;
    AvailabilityCode: string;
    CarColour: string;
    imageURL: string;
    CarPrice: number;
}

