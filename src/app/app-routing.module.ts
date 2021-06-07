import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { HeadphonesComponent } from './headphones/headphones.component';
import { HomeComponent } from './home/home.component';
import { LaptopsComponent } from './laptops/laptops.component';

import { LoginComponent } from './login/login.component';
import { MobilesComponent } from './mobiles/mobiles.component';
import { MobilesdetailsComponent } from './mobilesdetails/mobilesdetails.component';
import { WatchesComponent } from './watches/watches.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'mobiles',component:MobilesComponent},
{path:'mobilesdetails',component:MobilesdetailsComponent},
{path:'laptops',component:LaptopsComponent},
{path:'watches',component:WatchesComponent},
{path:'headphones',component:HeadphonesComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
