import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,AlertController } from '@ionic/angular';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { Platform } from '@ionic/angular';

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
  dataStorage:any = [];
  dataProvin:any = [];

  loading:any;
  fid:any;
  todo = {
    CWT: '',
    TMP: '',
    ID1: '',
  };
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private geolocation: Geolocation,
    private storage: Storage,
    public loadingController:LoadingController,
    public alertController:AlertController,
    private openNativeSettings: OpenNativeSettings,
    private platform:Platform
  ) {
   
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    await this.loading.present();
    this.dataStorage  = await this.storage.get('formfamily');
    this.dataProvin   = await this.storage.get('provincesDetail');
    this.fid          = await this.dataStorage == null ? 1 : this.dataStorage.length+1;

    var option = {
      timeout: 5000, 
      enableHighAccuracy: true
    }
    await this.geolocation.getCurrentPosition(option).then((resp) => {
      this.latitude   = resp.coords.latitude;
      this.longitude  = resp.coords.longitude;
      this.loading.dismiss();
    }).catch((error) => {
      this.loading.dismiss();
      this.waitLocation();
    });
    await this.loading.dismiss();
  }
  async formData(form){
    let date = new Date();
    var pad = function(num) { return ('00'+num).slice(-2) };
    let dateDay = date.getUTCFullYear()+"-"+pad(date.getUTCMonth() + 1)+"-"+pad(date.getUTCDate())+" "+pad(date.getHours())+":"+pad(date.getMinutes())+":"+pad(date.getSeconds());
    if(this.dataStorage == null){
      let dataAnswer = [{
        "CWT":this.dataProvin.id_provinces,
        "TMP":this.dataProvin.id_amphures,
        "ID1":this.dataProvin.id_tombons,
        "LAT":this.latitude,
        "LONG":this.longitude,
        "fid":this.fid,
        "dateStart":dateDay
      }];
      this.storage.set('formfamily',dataAnswer);
      this.router.navigateByUrl('/formthree/form2');
    }else{
      let dataAnswer = {
        "CWT":this.dataProvin.id_provinces,
        "TMP":this.dataProvin.id_amphures,
        "ID1":this.dataProvin.id_tombons,
        "LAT":this.latitude,
        "LONG":this.longitude,
        "fid":this.fid,
        "dateStart":dateDay
      };
      await this.dataStorage.push(dataAnswer);
      await this.storage.set('formfamily',this.dataStorage);
      this.router.navigateByUrl('/formthree/form2');
    }
  }
  async waitLocation() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'แจ้งเตือน!',
      message: 'ไม่สามารถโหลด location ได้กรุณาเปิด location',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.openLocation();
          }
        }
      ]
    });

    await alert.present();
  }
  async openLocation(){
    await this.openNativeSettings.open("location").then((res)=>{
      console.log('opened settings');
    },(err)=>{
      console.log('failed to open settings'+err);
    });
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 10000
    });
    await this.loading.present();
  }
}
