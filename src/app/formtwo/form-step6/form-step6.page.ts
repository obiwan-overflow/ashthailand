import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step6',
  templateUrl: './form-step6.page.html',
  styleUrls: ['./form-step6.page.scss'],
})
export class FormStep6Page implements OnInit {
  dataStorage: any = [];
  titleShop:any;
  constructor(public router:Router,public storage:Storage,public api:RestApiService,public alertController:AlertController,public loadingController:LoadingController,public auth:AuthService) {
    this.titleShop = this.auth.titleShop();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('formshop').then((data)=>{
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
      this.dataStorage.S4A      = data.S4A;
      this.dataStorage.S5A      = data.S5A;
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
      "S4A":this.dataStorage.S4A,
      "S5A":this.dataStorage.S5A,
      "S6A":id
    }
    await this.storage.set('formshop',dataAnswer);
    this.formConfirm(id);
  }
  async formConfirm(id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'บันทึก!',
      message: 'ยืนยันการบันทึกข้อมูล',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'บันทึก',
          handler: () => {
            console.log('Confirm Okay');

            const formData = new FormData();
            formData.append('cat_id',"2");
            formData.append('CWT',this.dataStorage.CWT);
            formData.append('TMP',this.dataStorage.TMP);
            formData.append('ID1',this.dataStorage.ID1);
            formData.append('VIL',this.dataStorage.VIL);
            formData.append('MOO',this.dataStorage.MOO);
            formData.append('A1',this.dataStorage.A1);
            formData.append('NAME',this.dataStorage.NAME);
            formData.append('ADDRESS',this.dataStorage.ADDRESS);
            formData.append('LAT',this.dataStorage.LAT);
            formData.append('LONG',this.dataStorage.LONG);
            formData.append('images',this.dataStorage.images);
            formData.append('S1A',this.dataStorage.S1A);
            formData.append('S2A',this.dataStorage.S2A);
            formData.append('S3A',this.dataStorage.S3A);
            formData.append('S4A',this.dataStorage.S4A);
            formData.append('S5A',this.dataStorage.S5A);
            formData.append('S6A',id);
            this.api.postdata('reportQuestion',formData).subscribe((res)=>{
              if(res.result == 'success'){
                this.router.navigateByUrl('tabs/form');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
