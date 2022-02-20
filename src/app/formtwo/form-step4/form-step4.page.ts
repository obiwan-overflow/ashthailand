import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step4',
  templateUrl: './form-step4.page.html',
  styleUrls: ['./form-step4.page.scss'],
})
export class FormStep4Page implements OnInit {
  dataStorage: any = [];
  titleShop:any;
  constructor(public router:Router,public storage:Storage,public loadingController:LoadingController,public auth:AuthService) {
    this.titleShop = this.auth.titleShop();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('shop').then((data)=>{
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
      this.dataStorage.S1A      = data.S1A;
      this.dataStorage.S2A      = data.S2A;
      this.dataStorage.S3A      = data.S3A;
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
      "S1A":this.dataStorage.S1A,
      "S2A":this.dataStorage.S2A,
      "S3A":this.dataStorage.S3A,
      "S4A":id
    }
    await this.storage.set('shop',dataAnswer);
    await this.router.navigate(['formtwo/form-step5']);
  }
}
