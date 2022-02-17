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
  P3A:any;

  titlePub:any;
  constructor(public router:Router,public storage:Storage,public api:RestApiService,public alertController:AlertController,public loadingController:LoadingController,public auth:AuthService) {
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
      this.P2A      = data.P2A === undefined ? "" : this.P2A;
      this.P3A      = data.P3A === undefined ? "" : this.P3A;
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
      "P3A":this.P3A,
      "P4A":id,
    }
    await this.storage.set('public',dataAnswer);

    if(id == "พบภายนอกอาคาร/สิ่งปลูกสร้างใดๆ ที่มิได้จัดไว้ให้เป็นเขตสูบบุหรี่"){
      await this.router.navigate(['formone/form-step1/form-step3/form-step4/form-step5']);
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
            formData.append('CWT',this.CWT);
            formData.append('TMP',this.TMP);
            formData.append('ID1',this.ID1);
            formData.append('VIL',this.VIL);
            formData.append('MOO',this.MOO);
            formData.append('A1',this.A1);
            formData.append('NAME',this.NAME);
            formData.append('ADDRESS',this.ADDRESS);
            formData.append('LAT',this.LAT);
            formData.append('LONG',this.LONG);
            formData.append('P1A',this.P1A);
            formData.append('P2A',this.P2A);
            formData.append('P3A',this.P3A);
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
