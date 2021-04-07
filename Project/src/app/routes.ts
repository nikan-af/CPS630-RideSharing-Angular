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

/* All the url routes in our website and the corresponding components  */

export const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'ride-services', component: RideServicesComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'delivery-services', component: DeliveryServices },
  { path: 'ride-green', component: RideGreenComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dbMaintain/user-maintain', component: UserMaintainComponent},
  { path: 'dbMaintain/car-maintain', component: CarMaintainComponent},
  { path: 'dbMaintain/store-maintain', component: StoreMaintainComponent},
  { path: 'dbMaintain', component: DbmaintainComponent},
  { path: '**', component: MainComponent }
];
