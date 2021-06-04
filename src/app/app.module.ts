import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { MobilesComponent } from './mobiles/mobiles.component';
import { MobilesdetailsComponent } from './mobilesdetails/mobilesdetails.component';
import { LaptopsComponent } from './laptops/laptops.component';
import { LaptopsdetailsComponent } from './laptopsdetails/laptopsdetails.component';
import { WatchesComponent } from './watches/watches.component';
import { WatchesdetailsComponent } from './watchesdetails/watchesdetails.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DisplayComponent,
    MobilesComponent,
    MobilesdetailsComponent,
    LaptopsComponent,
    LaptopsdetailsComponent,
    WatchesComponent,
    WatchesdetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
