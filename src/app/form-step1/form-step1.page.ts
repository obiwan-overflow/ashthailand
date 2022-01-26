import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Component({
  selector: 'app-form-step1',
  templateUrl: './form-step1.page.html',
  styleUrls: ['./form-step1.page.scss'],
})
export class FormStep1Page implements OnInit {

  id:any;
  latitude:any;
  longitude:any;
  constructor(public router:Router,public api:RestApiService,public route:ActivatedRoute,private geolocation: Geolocation,private network: Network) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
  async form(){
    this.router.navigateByUrl('/tabs/form/form-step1/form-step2/'+this.id);
  }
  async ionViewWillEnter(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude   = resp.coords.latitude;
      this.longitude  = resp.coords.longitude;
      console.log('latitude = '+this.latitude+' longitude = '+this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
