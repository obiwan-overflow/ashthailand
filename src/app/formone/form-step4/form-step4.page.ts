import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { AlertController,LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step4',
  templateUrl: './form-step4.page.html',
  styleUrls: ['./form-step4.page.scss'],
})
export class FormStep4Page implements OnInit {
  dataStorage:any = [];
  titlePub:any;
  constructor(public router:Router,public storage:Storage,public api:RestApiService,public alertController:AlertController,public loadingController:LoadingController,public auth:AuthService) {
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
      "P2A":this.dataStorage.P2A,
      "P3A":this.dataStorage.P3A,
      "P4A":id,
    }
    await this.storage.set('formpublic',dataAnswer);

    if(id == "4"){
      await this.router.navigate(['formone/form-step5']);
    }else{
      this.formConfirm(id);
    }
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
            formData.append('cat_id',"1");
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
            formData.append('P1A',this.dataStorage.P1A);
            formData.append('P2A',this.dataStorage.P2A);
            formData.append('P3A',this.dataStorage.P3A);
            formData.append('P4A',id);
            formData.append('P5A',"");
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
