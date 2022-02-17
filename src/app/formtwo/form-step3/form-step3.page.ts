import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step3',
  templateUrl: './form-step3.page.html',
  styleUrls: ['./form-step3.page.scss'],
})
export class FormStep3Page implements OnInit {

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

  titleShop:any;
  constructor(public router:Router,public storage:Storage,public auth:AuthService) {
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
      "S3A":id
    }
    await this.storage.set('shop',dataAnswer);
    await this.router.navigate(['formtwo/form-step1/form-step2/form-step3/form-step4']);
  }
}
