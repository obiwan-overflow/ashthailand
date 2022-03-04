import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';
import { ActionSheetController,LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.page.html',
  styleUrls: ['./form3.page.scss'],
})
export class Form3Page implements OnInit {

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
    public toastController:ToastController
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
    if(form.value.A1 == ''){
      this.presentToast();
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
      await this.storage.set('formpublic',dataAnswer);
      await this.router.navigateByUrl('/formone/form4');
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'กรุณากรอกข้อมูล',
      duration: 2000,
      color:"danger",
      position:"middle"
    });
    toast.present();
  }
  todo = {
    A1: '',
  }
}
