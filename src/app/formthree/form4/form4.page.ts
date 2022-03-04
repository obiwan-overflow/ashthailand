import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.page.html',
  styleUrls: ['./form4.page.scss'],
})
export class Form4Page implements OnInit {

  province:any;
  district:any;
  subdistrict:any;
  latitude:any;
  longitude:any;
  dataStorage:any = [];
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private storage: Storage,
    public loadingController:LoadingController,
    public toastController:ToastController,
    public alertController:AlertController
  ) {
    this.storage.get('userData').then((data)=>{
      this.province     = data.province;
      this.district     = data.district;
      this.subdistrict  = data.subdistrict;
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('formfamily').then((data)=>{
      this.dataStorage.CWT        = data.CWT;
      this.dataStorage.ID1        = data.ID1;
      this.dataStorage.TMP        = data.TMP;
      this.dataStorage.LAT        = data.LAT;
      this.dataStorage.LONG       = data.LONG;
      this.dataStorage.MOO        = data.MOO;
      this.dataStorage.VIL        = data.VIL;
      this.dataStorage.A1         = data.A1;
      this.dataStorage.MEMBER     = data.MEMBER;
      this.dataStorage.PERSON_NO  = data.PERSON_NO == undefined ? 1 : (data.PERSON_NO + 1);
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    let dataAnswer = {
      "CWT":this.dataStorage.CWT,
      "TMP":this.dataStorage.TMP,
      "ID1":this.dataStorage.ID1,
      "LAT":this.dataStorage.LAT,
      "LONG":this.dataStorage.LONG,
      "MOO":this.dataStorage.MOO,
      "VIL":this.dataStorage.VIL,
      "A1":this.dataStorage.A1,
      "MEMBER":this.dataStorage.MEMBER,
      "NAME":form.value.NAME,
      "SEX":form.value.SEX,
      "AGE":form.value.AGE,
      "PERSON_NO":this.dataStorage.PERSON_NO,
    }
    await this.storage.set('formfamily',dataAnswer);
    if(form.value.AGE == '' || form.value.NAME == '' || form.value.SEX == ''){
      this.presentToast();
    }else if (form.value.AGE >= 15){
      this.router.navigateByUrl('/formthree/form-step1');
    }else if(form.value.AGE <= 14){
      this.formConfirm(form.value.NAME,form.value.SEX,form.value.AGE);
    }
  }
  async formConfirm(NAME,SEX,AGE){
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
            formData.append('MEMBER',this.dataStorage.MEMBER),
            formData.append('PERSON_NO',this.dataStorage.PERSON_NO),
            formData.append('CWT',this.dataStorage.CWT);
            formData.append('TMP',this.dataStorage.TMP);
            formData.append('ID1',this.dataStorage.ID1);
            formData.append('VIL',this.dataStorage.VIL);
            formData.append('MOO',this.dataStorage.MOO);
            formData.append('A1',this.dataStorage.A1);
            formData.append('LAT',this.dataStorage.LAT);
            formData.append('LONG',this.dataStorage.LONG);
            formData.append('SEX',SEX),
            formData.append('AGE',AGE),
            formData.append('NAME',NAME),
            this.api.postdata('reportQuestion',formData).subscribe((res)=>{
              if(res.result == 'success'){
                // this.router.navigateByUrl('tabs/form');
                if(this.dataStorage.MEMBER - this.dataStorage.PERSON_NO !== 0){
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
  async alertAgelimit(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'เงื่อนไข!',
      message: 'อายุเกินกำหนด',
      keyboardClose:true
    });
    await alert.present();
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

  todo = {
    NAME: '',
    SEX: '',
    AGE: '',
  };

}
