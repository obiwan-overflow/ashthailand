import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-response',
  templateUrl: './form-response.page.html',
  styleUrls: ['./form-response.page.scss'],
})
export class FormResponsePage implements OnInit {

  MEMBER:any;
  PERSON_NO:any;
  SEX:any;
  AGE:any;
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
  SMOKE:any;
  TIME_Y:any;
  TIME_M:any;
  CIG:any;
  ROLL:any;
  E_CIG:any;
  OTHER:any;
  NO1:any;
  NO2:any;
  constructor(public storage:Storage,public api:RestApiService,public router:Router,public alertController:AlertController,public loadingController:LoadingController) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('formfamily').then((data)=>{
      this.MEMBER     = data.MEMBER;
      this.PERSON_NO  = data.PERSON_NO;
      this.SEX        = data.SEX;
      this.AGE        = data.AGE;
      this.CWT        = data.CWT;
      this.TMP        = data.TMP;
      this.ID1        = data.ID1;
      this.VIL        = data.VIL;
      this.MOO        = data.MOO;
      this.A1         = data.A1;
      this.NAME       = data.NAME;
      this.ADDRESS    = data.ADDRESS;
      this.LAT        = data.LAT;
      this.LONG       = data.LONG;
      this.SMOKE      = data.SMOKE;
      this.TIME_Y     = data.TIME_Y;
      this.TIME_M     = data.TIME_M === undefined ? "" : data.TIME_M;
      this.CIG        = data.CIG === undefined ? "" : data.CIG;
      this.NO1        = data.NO1 === undefined ? "" : data.NO1;
      this.ROLL       = data.ROLL === undefined ? "" : data.ROLL;
      this.NO2        = data.NO2 === undefined ? "" : data.NO2;
      this.E_CIG      = data.E_CIG === undefined ? "" : data.E_CIG;
      this.OTHER      = data.OTHER === undefined ? "" : data.OTHER;
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
    if(id == "1"){
      if(this.CIG == '1'){
        let dataAnswer = {
          "MEMBER":this.MEMBER,
          "PERSON_NO":this.PERSON_NO,
          "SEX":this.SEX,
          "AGE":this.AGE,
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
          "SMOKE":this.SMOKE,
          "TIME_Y":this.TIME_Y,
          "TIME_M":this.TIME_M,
          "CIG":this.CIG,
          "NO1":this.NO1,
          "ROLL":this.ROLL,
          "NO2":this.NO2,
          "E_CIG":this.E_CIG,
          "OTHER":this.OTHER,
          "RESPONSE":id
        }
        await this.storage.set('formfamily',dataAnswer);
        await this.router.navigateByUrl('formthree/form-step10');
      }else if(this.ROLL == '1' || this.E_CIG == '1' || this.OTHER == '1'){
        let dataAnswer = {
          "MEMBER":this.MEMBER,
          "PERSON_NO":this.PERSON_NO,
          "SEX":this.SEX,
          "AGE":this.AGE,
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
          "SMOKE":this.SMOKE,
          "TIME_Y":this.TIME_Y,
          "TIME_M":this.TIME_M,
          "CIG":this.CIG,
          "NO1":this.NO1,
          "ROLL":this.ROLL,
          "NO2":this.NO2,
          "E_CIG":this.E_CIG,
          "OTHER":this.OTHER,
          "RESPONSE":id
        }
        await this.storage.set('formfamily',dataAnswer);
        await this.router.navigateByUrl('formthree/form-step11');
      }else{
        let dataAnswer = {
          "MEMBER":this.MEMBER,
          "PERSON_NO":this.PERSON_NO == undefined ? 1 : (this.PERSON_NO + 1),
          "SEX":this.SEX,
          "AGE":this.AGE,
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
          "SMOKE":this.SMOKE,
          "TIME_Y":this.TIME_Y,
          "TIME_M":this.TIME_M,
          "CIG":this.CIG,
          "NO1":this.NO1,
          "ROLL":this.ROLL,
          "NO2":this.NO2,
          "E_CIG":this.E_CIG,
          "OTHER":this.OTHER,
          "RESPONSE":id
        }
        await this.storage.set('formfamily',dataAnswer);
        await this.formConfirm(id);
      }
    }else{
      let dataAnswer = {
        "MEMBER":this.MEMBER,
        "PERSON_NO":this.PERSON_NO == undefined ? 1 : (this.PERSON_NO + 1),
        "SEX":this.SEX,
        "AGE":this.AGE,
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
        "SMOKE":this.SMOKE,
        "TIME_Y":this.TIME_Y,
        "TIME_M":this.TIME_M,
        "CIG":this.CIG,
        "NO1":this.NO1,
        "ROLL":this.ROLL,
        "NO2":this.NO2,
        "E_CIG":this.E_CIG,
        "OTHER":this.OTHER,
        "RESPONSE":id
      }
      await this.storage.set('formfamily',dataAnswer);
      await this.formConfirm(id);
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
            formData.append('cat_id',"3");
            formData.append('MEMBER',this.MEMBER),
            formData.append('PERSON_NO',this.PERSON_NO),
            formData.append('SEX',this.SEX),
            formData.append('AGE',this.AGE),
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
            formData.append('SMOKE',this.SMOKE);
            formData.append('TIME_Y',this.TIME_Y);
            formData.append('TIME_M',this.TIME_M);
            formData.append('CIG',this.CIG);
            formData.append('ROLL',this.ROLL);
            formData.append('E_CIG',this.E_CIG);
            formData.append('OTHER',this.OTHER);
            formData.append('NO1',(this.NO1+this.NO2));
            formData.append('RESPONSE',id);
            this.api.postdata('reportQuestion',formData).subscribe((res)=>{
              if(res.result == 'success'){
                if(this.MEMBER - this.PERSON_NO !== 0){
                  this.router.navigateByUrl('/formthree/form-family-lists');
                }else{
                  this.presentAlertConfirm();
                }
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'สำเร็จ!',
      message: 'เก็บข้อมูลในครัวเรือนครบแล้ว',
      backdropDismiss:false,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.router.navigateByUrl('tabs/form');
          }
        }
      ]
    });

    await alert.present();
  }
}
