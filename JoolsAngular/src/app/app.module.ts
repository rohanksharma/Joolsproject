
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './share/header/header.component';
import { SidebarComponent } from './share/sidebar/sidebar.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { AddService } from './services/AddService';
import { GetproductdetailsService } from './services/getproductdetails.service'
import { ProductstoneComponent } from './share/productstone/productstone.component';
import { SpinnerComponent } from './share/spinner/spinner.component';
import { SkuListComponent } from './sku-list/sku-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import * as fromCustomer from './customer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './customer.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    AddproductComponent,
    SearchproductComponent,
    ProductstoneComponent,
    SpinnerComponent,
    SkuListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(fromCustomer.customerFeatureKey, fromCustomer.reducer),
    EffectsModule.forRoot([CustomerEffects])
  ],
  providers: [AddService,SpinnerComponent,GetproductdetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
