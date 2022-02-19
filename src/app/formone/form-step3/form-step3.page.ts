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

  CWT:any;
  TMP:any;
  ID1:any;
  VIL:any;
  MOO:any;
  A1:any;
  NAME:any;
  ADDRESS:any;
  LAT:any;
  LONG:any;
  P1A:any;
  P2A:any;

  titlePub:any;
  constructor(
    public router:Router,
    public storage:Storage,
    public loadingController:LoadingController,
    public auth:AuthService,
    public toastController:ToastController) {
    this.titlePub = this.auth.titlePublic();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('public').then((data)=>{
      this.CWT      = data.CWT;
      this.TMP      = data.TMP;
      this.ID1      = data.ID1;
      this.VIL      = data.VIL;
      this.MOO      = data.MOO;
      this.A1       = data.A1;
      this.NAME     = data.NAME;
      this.ADDRESS  = data.ADDRESS;
      this.LAT      = data.LAT;
      this.LONG     = data.LONG;
      this.P1A      = data.P1A;
      this.P2A      = data.P2A;
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
    if(this.P2A == "ไม่ใช่"){
      if(id == "ไม่ใช่"){
        this.presentToast();
      }else{
        let dataAnswer = {
          "CWT":this.CWT,
          "TMP":this.TMP,
          "ID1":this.ID1,
          "VIL":this.VIL,
          "MOO":this.MOO,
          "A1":this.A1,
          "NAME":this.NAME,
          "ADDRESS":this.ADDRESS,
          "LAT":this.LAT,
          "LONG":this.LONG,
          "P1A":this.P1A,
          "P2A":this.P2A,
          "P3A":id,
        }
        await this.storage.set('public',dataAnswer);
        await this.router.navigate(['formone/form-step4']);
      }
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'เพราะไม่พบป้ายห้ามสูบทั้งภายในแหละภายนอกอาคาร',
      duration: 2000,
      color:"danger"
    });
    toast.present();
  }
}
