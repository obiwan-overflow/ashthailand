import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  latitude:any;
  longitude:any;
  constructor(public router:Router,public api:RestApiService,public route:ActivatedRoute,private geolocation: Geolocation,private network: Network,private storage: Storage) { }

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
    MENBER: '',
    PERSON_NO: '',
    SEX: '',
    AGE: '',
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
    await this.storage.set('MENBER',form.value.MENBER);
    await this.storage.set('PERSON_NO',form.value.PERSON_NO);
    await this.storage.set('SEX',form.value.SEX);
    await this.storage.set('AGE',form.value.AGE);
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
    this.router.navigateByUrl('/formthree/form-step1');
  }
}
