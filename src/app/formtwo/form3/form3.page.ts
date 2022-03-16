import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';
import { LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.page.html',
  styleUrls: ['./form3.page.scss'],
})
export class Form3Page implements OnInit {
  dataStorage: any = [];
  titleShop:any;
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private network: Network,
    private storage: Storage,
    public auth:AuthService,
    public loadingController:LoadingController,
    public toastController:ToastController,
    public alertController:AlertController
  ) {
    this.titleShop = this.auth.titleShop();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.dataStorage = await this.storage.get('formshop');
    
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    if(form.value.A1 == ''){
      this.alert();
    }else{
      let dataAnswer = {
        "CWT":this.dataStorage.CWT,
        "ID1":this.dataStorage.ID1,
        "TMP":this.dataStorage.TMP,
        "LAT":this.dataStorage.LAT,
        "LONG":this.dataStorage.LONG,
        "MOO":this.dataStorage.MOO,
        "VIL":this.dataStorage.VIL,
        "A1":form.value.A1,
      }
      await this.storage.set('formshop',dataAnswer);
      await this.router.navigateByUrl('/formtwo/form4');
    }
  }
  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ตรวจสอบ',
      message: 'กรุณากรอกข้อมูล !!!',
    });

    await alert.present();
  }
  todo = {
    A1: '',
  }
}
