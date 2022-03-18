import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';
import { LoadingController,AlertController } from '@ionic/angular';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';

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

  loading:any;
  
  titleShop:any;
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private geolocation: Geolocation,
    private network: Network,
    private storage: Storage,
    public auth:AuthService,
    public loadingController:LoadingController,
    public alertController:AlertController,
    private openNativeSettings: OpenNativeSettings
    
    ) {
      this.titleShop = this.auth.titleShop();
    }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    this.loading.present();
    this.storage.get('provincesDetail').then((data)=>{
      this.province     = data.provinces;
      this.district     = data.amphures;
      this.subdistrict  = data.tombons;
    });
    this.loadData();
  }
  async loadData(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude   = resp.coords.latitude;
      this.longitude  = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.loading.dismiss();
  }
  async formData(form){
    if(this.latitude == undefined || this.latitude == null || this.latitude == ""){
      this.presentAlertConfirm();
    }else{
      let dataAnswer = {
        "CWT":this.province,
        "ID1":this.district,
        "TMP":this.subdistrict,
        "LAT":this.latitude,
        "LONG":this.longitude,
      }
      await this.storage.set('formshop',dataAnswer);
      await this.router.navigateByUrl('/formtwo/form2');
    }
  }
  async presentAlertConfirm() {
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
      this.ionViewWillEnter();
    },(err)=>{
      console.log('failed to open settings'+err);
    });
  }
  todo = {
    CWT: '',
    TMP: '',
    ID1: '',
  };
}
