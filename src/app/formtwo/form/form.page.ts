import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';
import { LoadingController,AlertController } from '@ionic/angular';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  dataProvince:any = [];
  latitude:any;
  longitude:any;

  loading:any;
  
  titleShop:any;
  numberId:any;
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
    private network: Network,
    private storage: Storage,
    public auth:AuthService,
    public loadingController:LoadingController,
    public alertController:AlertController,
    private openNativeSettings: OpenNativeSettings,
    private platform:Platform
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
    await this.loading.present();
    this.dataProvince   = await this.storage.get('provincesDetail');
    this.numberId       = await this.route.snapshot.paramMap.get('id');
    
    var option = {
      enableHighAccuracy: true
    }
    await this.geolocation.getCurrentPosition(option).then((resp) => {
      this.latitude   = resp.coords.latitude;
      this.longitude  = resp.coords.longitude;
      this.loading.dismiss();
    }).catch((error) => {
      this.loading.dismiss();
      alert(error);
    });
    await this.loading.dismiss();
  }
  async formData(form){
    if(this.latitude == undefined || this.longitude == undefined){
      this.presentAlertConfirm();
    }else{
      let dataAnswer = {
        "CWT":this.dataProvince.id_provinces,
        "ID1":this.dataProvince.id_amphures,
        "TMP":this.dataProvince.id_tombons,
        "LAT":this.latitude,
        "LONG":this.longitude,
      }
      await this.storage.set('formshop_step1',dataAnswer);
      await this.router.navigateByUrl('/formtwo/form2/'+this.numberId);
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
  async backPage(){
    this.router.navigateByUrl('tabs/form');
  }
}
