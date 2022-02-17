import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step6',
  templateUrl: './form-step6.page.html',
  styleUrls: ['./form-step6.page.scss'],
})
export class FormStep6Page implements OnInit {

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
  S1A:any;
  S2A:any;
  S3A:any;
  S4A:any;
  S5A:any;

  titleShop:any;
  constructor(public router:Router,public storage:Storage,public api:RestApiService,public alertController:AlertController,public auth:AuthService) {
    this.titleShop = this.auth.titleShop();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('shop').then((data)=>{
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
      this.S1A      = data.S1A;
      this.S2A      = data.S2A;
      this.S3A      = data.S3A;
      this.S4A      = data.S4A;
      this.S5A      = data.S5A;
    });
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
      "S1A":this.S1A,
      "S2A":this.S2A,
      "S3A":this.S3A,
      "S4A":this.S4A,
      "S5A":this.S5A,
      "S6A":id
    }
    await this.storage.set('shop',dataAnswer);
    this.formConfirm(id);
    // await this.router.navigate(['formtwo/form-step1/form-step2/form-step3/form-step4/form-step5/form-step6']);
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
            formData.append('S1A',this.S1A);
            formData.append('S2A',this.S2A);
            formData.append('S3A',this.S3A);
            formData.append('S4A',this.S4A);
            formData.append('S5A',this.S5A);
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
