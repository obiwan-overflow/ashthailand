import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-smoketype',
  templateUrl: './form-smoketype.page.html',
  styleUrls: ['./form-smoketype.page.scss'],
})
export class FormSmoketypePage implements OnInit {

  MENBER:any;
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
  constructor(public storage:Storage,public api:RestApiService,public router:Router,public alertController:AlertController) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('formthree').then((data)=>{
      this.MENBER     = data.MENBER;
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
    });
  }
  async form(event){
    let id = event.srcElement.id;
    if(id == '5'){
      let dataAnswer = {
        "MENBER":this.MENBER,
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
        "CIG":"สูบ"
      }
      await this.storage.set('formthree',dataAnswer);
      await this.router.navigateByUrl('formthree/form-step1/form-step4/form-step4b/form-smoketype/form-step9');
    }else if(id == '6'){
      let dataAnswer = {
        "MENBER":this.MENBER,
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
        "ROLL":"สูบ"
      }
      await this.storage.set('formthree',dataAnswer);
      await this.router.navigateByUrl('formthree/form-step1/form-step4/form-step4b/form-smoketype/form-step9');
    }else if(id == '7'){
      let dataAnswer = {
        "MENBER":this.MENBER,
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
        "E_CIG":"สูบ"
      }
      await this.storage.set('formthree',dataAnswer);
      await this.router.navigateByUrl('formthree/form-step1/form-step4/form-step4b/form-smoketype/form-response');
    }else if(id == '8'){
      let dataAnswer = {
        "MENBER":this.MENBER,
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
        "OTHER":"สูบ"
      }
      await this.storage.set('formthree',dataAnswer);
      await this.router.navigateByUrl('formthree/form-step1/form-step4/form-step4b/form-smoketype/form-response');
    }
  }
}
