import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';
import { ActionSheetController,LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})
export class Form2Page implements OnInit {

  titlePub:any;
  latitude:any;
  longitude:any;
  dataStorage:any = [];
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private network: Network,
    private storage: Storage,
    public auth:AuthService,
    public actionSheetController: ActionSheetController,
    public loadingController:LoadingController,
    public toastController:ToastController,
    public alertController:AlertController
  ) {
    this.titlePub = this.auth.titlePublic();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.dataStorage = await this.storage.get('formpublic');
    
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    if(form.value.MOO == '' || form.value.VIL == ''){
      this.alert();
    }else{
      let dataAnswer = {
        "CWT":this.dataStorage.CWT,
        "ID1":this.dataStorage.ID1,
        "TMP":this.dataStorage.TMP,
        "LAT":this.dataStorage.LAT,
        "LONG":this.dataStorage.LONG,
        "MOO":form.value.MOO,
        "VIL":form.value.VIL,
      };
      await this.storage.set('formpublic',dataAnswer);
      await this.router.navigateByUrl('/formone/form3');
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
    MOO: '',
    VIL: '',
  }
}
