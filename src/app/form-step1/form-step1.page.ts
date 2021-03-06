import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-form-step1',
  templateUrl: './form-step1.page.html',
  styleUrls: ['./form-step1.page.scss'],
})
export class FormStep1Page implements OnInit {

  id:any;
  latitude:any;
  longitude:any;
  constructor(public router:Router,public api:RestApiService,public route:ActivatedRoute,private geolocation: Geolocation,private network: Network,private storage: Storage) {
    this.id = this.route.snapshot.paramMap.get('id');
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
    A1: '',
    NAME: '',
    ADDRESS: '',
    LAT: '',
    LONG: ''
  };
  async formData(form){
    await this.storage.set('CWT',form.value.CWT);
    await this.storage.set('TMP',form.value.TMP);
    await this.storage.set('ID1',form.value.ID1);
    await this.storage.set('VIL',form.value.VIL);
    await this.storage.set('MOO',form.value.MOO);
    await this.storage.set('A1',form.value.A1);
    await this.storage.set('NAME',form.value.NAME);
    await this.storage.set('ADDRESS',form.value.ADDRESS);
    await this.storage.set('LAT',form.value.LAT);
    await this.storage.set('LONG',form.value.LONG);
    await this.router.navigateByUrl('/tabs/form/form-step1/form-step2/'+this.id);
  }
}
