import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RideServicesComponent } from './ride-services/ride-services.component';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { DeliveryServices } from './delivery-services/delivery-services.component';

/* All the url routes in our website and the corresponding components  */

export const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'ride-services', component: RideServicesComponent },
  { path: 'delivery-services', component: DeliveryServices },
  { path: 'contact', component: ContactComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: MainComponent }
];
