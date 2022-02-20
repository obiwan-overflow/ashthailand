import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AuthService } from 'src/app/AuthService';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})
export class Form2Page implements OnInit {

  todo:any = {};
  dataStorage: any = [];
  titleShop:any;
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private geolocation: Geolocation,
    private network: Network,
    private storage: Storage,
    private camera: Camera,
    public auth:AuthService,
    public loadingController:LoadingController
  ) {
    this.titleShop = this.auth.titleShop();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('shop').then((data)=>{
      this.dataStorage.CWT      = data.CWT;
      this.dataStorage.ID1      = data.ID1;
      this.dataStorage.TMP      = data.TMP;
      this.dataStorage.LAT      = data.LAT;
      this.dataStorage.LONG     = data.LONG;
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
      "CWT":this.dataStorage.CWT,
      "ID1":this.dataStorage.ID1,
      "TMP":this.dataStorage.TMP,
      "LAT":this.dataStorage.LAT,
      "LONG":this.dataStorage.LONG,
      "MOO":form.value.MOO,
      "VIL":form.value.VIL,
    }
    await this.storage.set('shop',dataAnswer);
    await this.router.navigateByUrl('/formtwo/form3');
  }
}
