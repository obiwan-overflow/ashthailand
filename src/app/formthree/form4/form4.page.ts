import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,ToastController } from '@ionic/angular';

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
    public toastController:ToastController
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
      this.dataStorage.CWT      = data.CWT;
      this.dataStorage.ID1      = data.ID1;
      this.dataStorage.TMP      = data.TMP;
      this.dataStorage.LAT      = data.LAT;
      this.dataStorage.LONG     = data.LONG;
      this.dataStorage.MOO      = data.MOO;
      this.dataStorage.VIL      = data.VIL;
      this.dataStorage.A1       = data.A1;
      this.dataStorage.MEMBER   = data.MEMBER;
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    console.log(form.value);
    let dataAnswer = {
      "CWT":this.dataStorage.CWT,
      "TMP":this.dataStorage.TMP,
      "ID1":this.dataStorage.ID1,
      "LAT":this.dataStorage.latitude,
      "LONG":this.dataStorage.longitude,
      "MOO":this.dataStorage.MOO,
      "VIL":this.dataStorage.VIL,
      "A1":this.dataStorage.A1,
      "MEMBER":this.dataStorage.MEMBER,
      "NAME":form.value.NAME,
      "SEX":form.value.SEX,
      "AGE":form.value.AGE,
    }
    await this.storage.set('formfamily',dataAnswer);
    if(form.value.AGE == ''){
      this.checkAge();
    }else if (form.value.AGE >= '15'){
      this.router.navigateByUrl('/formthree/form-step1');
    }else {
      this.presentToast();
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'อายุต่ำกว่า 15 บันทึกข้อมูล',
      duration: 2000,
      color:"success",
      position:"top"
    });
    toast.present();
  }
  async checkAge(){
    const toast = await this.toastController.create({
      message: 'กรุณากรอกอายุ',
      duration: 2000,
      color:"danger",
      position:"top"
    });
    toast.present();
  }
  todo = {
    NAME: '',
    SEX: '',
    AGE: '',
  };

}
