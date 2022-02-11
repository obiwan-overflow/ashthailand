import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { FormService } from 'src/app/service/form-service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {


  latitude:any;
  longitude:any;
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private geolocation: Geolocation,
    private network: Network,
    private storage: Storage,
    private camera: Camera,
    public FormService:FormService
  ) {

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
  }
  todo = {
    CWT: '',
    TMP: '',
    ID1: '',
    VIL: '',
    MOO: '',
    ADDRESS: '',
    LAT: '',
    LONG: ''
  };
  async formData(form){
    let dataAnswer = {
      "CWT":form.value.CWT,
      "TMP":form.value.TMP,
      "ID1":form.value.ID1,
      "VIL":form.value.VIL,
      "MOO":form.value.MOO,
      "ADDRESS":form.value.ADDRESS,
      "LAT":this.latitude,
      "LONG":this.longitude,
    }
    await this.storage.set('public',dataAnswer);
    await this.router.navigateByUrl('/formone/form2');
  }
}
