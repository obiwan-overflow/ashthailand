import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})
export class Form2Page implements OnInit {

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
    public loadingController:LoadingController
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
    await this.storage.get('formthree').then((data)=>{
      this.dataStorage.CWT      = data.CWT;
      this.dataStorage.ID1      = data.ID1;
      this.dataStorage.TMP      = data.TMP;
      this.dataStorage.LAT      = data.LAT;
      this.dataStorage.LONG     = data.LONG;
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    // let dataAnswer = {
    //   "MENBER":form.value.MENBER,
    //   "PERSON_NO":form.value.PERSON_NO,
    //   "SEX":form.value.SEX,
    //   "AGE":form.value.AGE,
    //   "CWT":form.value.CWT,
    //   "TMP":form.value.TMP,
    //   "ID1":form.value.ID1,
    //   "VIL":form.value.VIL,
    //   "MOO":form.value.MOO,
    //   "A1":form.value.A1,
    //   "NAME":form.value.NAME,
    //   "ADDRESS":form.value.ADDRESS,
    //   "LAT":this.latitude,
    //   "LONG":this.longitude
    // }
    let dataAnswer = {
      "CWT":this.dataStorage.CWT,
      "TMP":this.dataStorage.TMP,
      "ID1":this.dataStorage.ID1,
      "LAT":this.dataStorage.latitude,
      "LONG":this.dataStorage.longitude,
      "MOO":form.value.MOO,
      "VIL":form.value.VIL,
      "A1":form.value.A1,
    }
    await this.storage.set('formthree',dataAnswer);
    this.router.navigateByUrl('/formthree/form-step1');
  }
  todo = {
    MOO: '',
    VIL: '',
    A1: '',
  };

}
