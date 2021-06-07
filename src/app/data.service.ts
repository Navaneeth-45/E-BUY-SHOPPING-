import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mobiles } from './models/mobile.model';
import { Laptops } from './models/laptop.model';
import { Watches } from './models/watches.model';
import { Headphones } from './models/headphones.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private hc:HttpClient) { }

  getMobiles():Observable<Mobiles>{
    return this.hc.get<Mobiles>('http://localhost:3000/mobiles')
  }
  getLaptops():Observable<Laptops>{
    return this.hc.get<Laptops>('http://localhost:3000/laptops')
  }
  getWatches():Observable<Watches>{
    return this.hc.get<Watches>('http://localhost:3000/watches')
  }
  getHeadphones():Observable<Headphones>{
    return this.hc.get<Headphones>('http://localhost:3000/headphones')
  }
}
