import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step3',
  templateUrl: './form-step3.page.html',
  styleUrls: ['./form-step3.page.scss'],
})
export class FormStep3Page implements OnInit {
  dataStorage:any = [];
  titlePub:any;
  constructor(
    public router:Router,
    public storage:Storage,
    public loadingController:LoadingController,
    public auth:AuthService,
    public toastController:ToastController,
    public alertController:AlertController
  ) {
    this.titlePub = this.auth.titlePublic();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('formpublic').then((data)=>{
      this.dataStorage.CWT      = data.CWT;
      this.dataStorage.TMP      = data.TMP;
      this.dataStorage.ID1      = data.ID1;
      this.dataStorage.VIL      = data.VIL;
      this.dataStorage.MOO      = data.MOO;
      this.dataStorage.A1       = data.A1;
      this.dataStorage.NAME     = data.NAME;
      this.dataStorage.ADDRESS  = data.ADDRESS;
      this.dataStorage.LAT      = data.LAT;
      this.dataStorage.LONG     = data.LONG;
      this.dataStorage.images   = data.images;
      this.dataStorage.P1A      = data.P1A;
      this.dataStorage.P2A      = data.P2A;
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async form(event){
    let id = event.srcElement.id;
    if(this.dataStorage.P2A == "2"){
      if(id == "2"){
        this.presentAlertConfirm();
      }else{
        let dataAnswer = {
          "CWT":this.dataStorage.CWT,
          "TMP":this.dataStorage.TMP,
          "ID1":this.dataStorage.ID1,
          "VIL":this.dataStorage.VIL,
          "MOO":this.dataStorage.MOO,
          "A1":this.dataStorage.A1,
          "NAME":this.dataStorage.NAME,
          "ADDRESS":this.dataStorage.ADDRESS,
          "LAT":this.dataStorage.LAT,
          "LONG":this.dataStorage.LONG,
          "images":this.dataStorage.images,
          "P1A":this.dataStorage.P1A,
          "P2A":this.dataStorage.P2A,
          "P3A":id,
        }
        await this.storage.set('formpublic',dataAnswer);
        await this.router.navigateByUrl('formone/form-step4');
      }
    }else{
      let dataAnswer = {
        "CWT":this.dataStorage.CWT,
        "TMP":this.dataStorage.TMP,
        "ID1":this.dataStorage.ID1,
        "VIL":this.dataStorage.VIL,
        "MOO":this.dataStorage.MOO,
        "A1":this.dataStorage.A1,
        "NAME":this.dataStorage.NAME,
        "ADDRESS":this.dataStorage.ADDRESS,
        "LAT":this.dataStorage.LAT,
        "LONG":this.dataStorage.LONG,
        "images":this.dataStorage.images,
        "P1A":this.dataStorage.P1A,
        "P2A":this.dataStorage.P2A,
        "P3A":id,
      }
      await this.storage.set('formpublic',dataAnswer);
      await this.router.navigateByUrl('formone/form-step4');
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'เพราะไม่พบป้ายห้ามสูบทั้งภายในแหละภายนอกอาคาร',
      duration: 2000,
      color:"danger",
      position:"top"
    });
    toast.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'เพราะไม่พบป้ายห้ามสูบทั้งภายในและภายนอกอาคาร !!!',
      backdropDismiss:false,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigateByUrl('formone/form-step1');
          }
        }
      ]
    });

    await alert.present();
  }
}
