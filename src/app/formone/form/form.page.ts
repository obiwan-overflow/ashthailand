import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  province:any;
  district:any;
  subdistrict:any;

  latitude:any;
  longitude:any;
  titlePub:any;
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private geolocation: Geolocation,
    private network: Network,
    private storage: Storage,
    public auth:AuthService,
    public loadingController:LoadingController
  ) {
    this.titlePub = this.auth.titlePublic();
    this.storage.get('userData').then((data)=>{
      this.province     = data.province;
      this.district     = data.district;
      this.subdistrict  = data.subdistrict;
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude   = resp.coords.latitude;
      this.longitude  = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    let dataAnswer = {
      "CWT":this.province,
      "ID1":this.district,
      "TMP":this.subdistrict,
      "LAT":this.latitude,
      "LONG":this.longitude,
    }
    await this.storage.set('formpublic',dataAnswer);
    await this.router.navigateByUrl('/formone/form2');
  }
  todo = {
    CWT: '',
    TMP: '',
    ID1: '',
  };
}
