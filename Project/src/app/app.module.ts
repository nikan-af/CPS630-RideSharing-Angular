import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MaterialElevationDirective } from './shared/material-elevation.directive';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ContactComponent } from './contact/contact.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { RideServicesComponent } from './ride-services/ride-services.component';
import { CarouselComponent } from './carousel/carousel.component';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { DirectionsMapDirective } from './shared/directives-map.directive';
import { OnDrag } from './shared/onDrag.directive';
import { OnDrop } from './shared/onDrop.directive';
import { DeliveryServices } from './delivery-services/delivery-services.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { DataService } from './shared/data.service';
import { DbmaintainComponent } from './dbmaintain/dbmaintain.component';
import { RecordUpdateDialogComponent } from './dbmaintain/record-update-dialog/record-update-dialog.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MyDatePipe } from './shared/date.pipe';
import { BrowserInfoDialog } from './browser-info-dialog/browser-info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    MainComponent,
    FooterComponent,
    RideServicesComponent,
    MaterialElevationDirective,
    ContactComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrdersComponent,
    CarouselComponent,
    AboutComponent,
    DirectionsMapDirective,
    OnDrag,
    OnDrop,
    DeliveryServices,
    ProductDialogComponent,
    DbmaintainComponent,
    RecordUpdateDialogComponent,
    ReviewsComponent,
    MyDatePipe,
    BrowserInfoDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    CookieService,
    MatDatepickerModule,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
