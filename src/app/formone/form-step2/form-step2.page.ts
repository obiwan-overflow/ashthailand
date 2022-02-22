import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step2',
  templateUrl: './form-step2.page.html',
  styleUrls: ['./form-step2.page.scss'],
})
export class FormStep2Page implements OnInit {
  dataStorage:any = [];
  titlePub:any;
  constructor(public router:Router,public storage:Storage,public loadingController:LoadingController,public auth:AuthService) {
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
      "P2A":id,
      "P3A":"",
    }
    await this.storage.set('formpublic',dataAnswer);
    await this.router.navigate(['formone/form-step3']);
  }
}
