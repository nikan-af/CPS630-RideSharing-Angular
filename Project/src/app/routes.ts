import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RideServicesComponent } from './ride-services/ride-services.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { DeliveryServices } from './delivery-services/delivery-services.component';
import { DbmaintainComponent } from './dbmaintain/dbmaintain.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserMaintainComponent } from './dbmaintain/user-maintain/user-maintain.component';
import { CarMaintainComponent } from './dbmaintain/car-maintain/car-maintain.component';
import { StoreMaintainComponent } from './dbmaintain/store-maintain/store-maintain.component';
import { RideGreenComponent } from './ride-green/ride-green.component';
import { RideSocialComponent } from './ride-social/ride-social.component';
import { ReviewsMaintainComponent } from './dbmaintain/reviews-maintain/reviews-maintain.component';
import { OrderMaintainComponent } from './dbmaintain/order-maintain/order-maintain.component';
import { PaymentMaintainComponent } from './dbmaintain/payment-maintain/payment-maintain.component';
import { TripMaintainComponent } from './dbmaintain/trip-maintain/trip-maintain.component';
import { InquiryMaintainComponent } from './dbmaintain/inquiry-maintain/inquiry-maintain.component';
import { DriverMaintainComponent } from './dbmaintain/driver-maintain/driver-maintain.component';
import { LoginAttemptMaintainComponent } from './dbmaintain/login-attempt-maintain/login-attempt-maintain.component';

/* All the url routes in our website and the corresponding components  */

export const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'ride-services', component: RideServicesComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'delivery-services', component: DeliveryServices },
  { path: 'ride-green', component: RideGreenComponent },
  { path: 'ride-social', component: RideSocialComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dbMaintain/loginattempt-maintain', component: LoginAttemptMaintainComponent },
  { path: 'dbMaintain/driver-maintain', component: DriverMaintainComponent },
  { path: 'dbMaintain/inquiry-maintain', component: InquiryMaintainComponent },
  { path: 'dbMaintain/trip-maintain', component: TripMaintainComponent },
  { path: 'dbMaintain/payment-maintain', component: PaymentMaintainComponent },
  { path: 'dbMaintain/order-maintain', component: OrderMaintainComponent },
  { path: 'dbMaintain/reviews-maintain', component: ReviewsMaintainComponent },
  { path: 'dbMaintain/user-maintain', component: UserMaintainComponent},
  { path: 'dbMaintain/car-maintain', component: CarMaintainComponent},
  { path: 'dbMaintain/store-maintain', component: StoreMaintainComponent},
  { path: 'dbMaintain', component: DbmaintainComponent},
  { path: '**', component: MainComponent }
];
