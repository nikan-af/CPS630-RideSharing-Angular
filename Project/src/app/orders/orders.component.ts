import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  loading = true;
  noOrderHistory: Boolean;
  user;
  orders;
  orderByDate: any[] = [];
  reverseList: any[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Creates an event listener on user login
    this.dataService.userBehaviorSubject.subscribe(
      data => {
        this.user = data;
      }
    );

    // Creates an event listener on orders so that the data is received here when the data changes in dataService.
    this.dataService.ordersInfoBehaviourSubject.subscribe(
      success => {
        this.processData(success);
      }
    )

    // // Creates an event listener on orders so that the data is received here when the data changes in dataService.
    // this.dataService.getOrders(this.user.id).subscribe(
    //   success => {
    //     this.processData(success);
    //   },
    //   fail => {
    //     console.log(fail);
    //   }
    // )
  }

  /**
   * Processes the data received from the back end.
   * Uses the timestamp to sort the data and convert the timestamp to key and an array of product objects as value.
   * So we can use the timestamp to get the products that were ordered on a certain date.
   * @param success 
   */
  processData(success) {
    this.orders = success as [];
    this.orderByDate = [];
    this.orders.map(order => {
      if (!this.orderByDate[`${order.timestamp}`]) {
        this.orderByDate[`${order.timestamp}`] = [];
      }
      this.orderByDate[`${order.timestamp}`].push(order);
    });
    if (this.orders.length === 0) {
      this.noOrderHistory = true;
    } else {
      this.noOrderHistory = false;
    }
    this.reverseList = this.orderByDate.reverse();
    this.loading = false;
  }

}
