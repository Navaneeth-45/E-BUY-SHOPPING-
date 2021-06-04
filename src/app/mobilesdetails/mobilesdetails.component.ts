import { Component, OnInit,Input,EventEmitter } from '@angular/core';
import { MobilesComponent } from '../mobiles/mobiles.component';
import { Mobiles } from '../models/mobile.model';

@Component({
  selector: 'app-mobilesdetails',
  templateUrl: './mobilesdetails.component.html',
  styleUrls: ['./mobilesdetails.component.css'],
  
})
export class MobilesdetailsComponent 
 {


  @Input() productObj:Mobiles;
  

}
