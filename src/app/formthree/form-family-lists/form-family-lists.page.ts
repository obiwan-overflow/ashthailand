import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,ToastController,AlertController } from '@ionic/angular';
import { RestApiService } from '../../rest-api.service';

@Component({
  selector: 'app-form-family-lists',
  templateUrl: './form-family-lists.page.html',
  styleUrls: ['./form-family-lists.page.scss'],
})
export class FormFamilyListsPage implements OnInit {

  dataStorage:any = [];
  dataStorageAll:any = [];
  datafamily:any = [];
  dataOutfamily:any = [];
  detail:any = [];
  personNo:any;
  btnSaveData:boolean;

  id:any;
  status:any;
  MOO:any;
  VIL:any;
  A1:any;
  // member:any;
  constructor(
    private storage: Storage,
    public router:Router,
    public loadingController:LoadingController,
    public alertController:AlertController,
    public route:ActivatedRoute,
    public api:RestApiService,
  ) {
    // this.btnSaveData = false;
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.MOO            = await this.route.snapshot.paramMap.get('MOO').replace("*kk*","/");
    this.VIL            = await this.route.snapshot.paramMap.get('VIL').replace("*kk*","/");
    this.A1             = await this.route.snapshot.paramMap.get('A1').replace("*kk*","/");
    this.status         = await this.route.snapshot.paramMap.get('status');
    this.dataStorageAll = await this.storage.get('formfamily');

    for (const val of this.dataStorageAll){
      if(await val.MOO == this.MOO && val.VIL == this.VIL && val.A1 == this.A1){
        this.detail = val;
        if(await val.PERSON_NO !== undefined){
          this.datafamily.push(val);
        }
        if(await val.status == undefined){
          this.btnSaveData = true;
        }
      }else{
        this.dataOutfamily.push(val);
      }
    }
  }
  async ionViewWillLeave(){
    this.datafamily = [];
    this.dataOutfamily = [];
    this.btnSaveData = undefined;
  }
  async updateMember() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '????????????????????????????????????????????????!',
      inputs: [
        {
          name: 'update',
          type: 'number',
          placeholder: '??????????????????????????????????????????',
          value: this.dataStorage.MEMBER
        }
      ],
      buttons: [
        {
          text: '??????????????????',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '??????????????????',
          handler: (data) => {
            for (const val of this.dataStorageAll){
              if(val.MOO == this.MOO && val.VIL == this.VIL && val.A1 == this.A1){
                val.MEMBER = data.update;
              }
            }
            this.storage.set('formfamily',this.dataStorageAll);
          }
        }
      ]
    });

    await alert.present();
  }
  async btnStart(){
    let date = new Date();
    var pad = function(num) { return ('00'+num).slice(-2) };
    let dateDay = date.getUTCFullYear()+"-"+pad(date.getUTCMonth() + 1)+"-"+pad(date.getUTCDate())+" "+pad(date.getHours())+":"+pad(date.getMinutes())+":"+pad(date.getSeconds());
    if(this.status == "success"){
      let dataAnswer = {
        "CWT":this.detail.CWT,
        "TMP":this.detail.TMP,
        "ID1":this.detail.ID1,
        "LAT":this.detail.LAT,
        "LONG":this.detail.LONG,
        "MOO":this.detail.MOO,
        "VIL":this.detail.VIL,
        "A1":this.detail.A1,
        "MEMBER":this.detail.MEMBER,
        "PERSON_NO":this.detail.PERSON_NO + 1,
        "fid":this.detail.fid + 1,
        "dateStart":dateDay,
      };
      await this.dataStorageAll.push(dataAnswer);
      await this.storage.set('formfamily',this.dataStorageAll);
      this.dataStorageAll = await this.storage.get('formfamily');
      let lastId = this.dataStorageAll.length - 1;
      this.router.navigateByUrl('/formthree/form4/'+lastId);
    }else if (this.status == "continue"){
      let lastId = this.dataStorageAll.length - 1;
      this.router.navigateByUrl('/formthree/form4/'+lastId);
    }
  }
  async btnDelete(del,name){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '???????????????????????????????????????????????????!',
      message: name,
      buttons: [
        {
          text: '??????????????????',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '??????????????????',
          handler: () => {
            this.deleteMemberFamily(del);
          }
        }
      ]
    });
    await alert.present();
  }
  async deleteMemberFamily(del){  
    await this.datafamily.splice(del,1);
    for (let val of this.datafamily){
      this.dataOutfamily.push(val);
    }
    await this.storage.set('formfamily',this.dataOutfamily);
    let IdMOO = this.MOO.replace("/","*kk*");
    let IdVIL = this.VIL.replace("/","*kk*");
    let IdA1  = this.A1.replace("/","*kk*");
    await this.router.navigateByUrl('waiting/'+IdMOO+'/'+IdVIL+'/'+IdA1);
  }
  async continue(index,name){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '????????????????????????????????????????????????!',
      message: name,
      buttons: [
        {
          text: '??????????????????',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '??????????????????',
          handler: () => {
            this.continueApprove(index,name);
          }
        }
      ]
    });
    await alert.present();
  }
  async continueApprove(index,name){
    let count = await this.dataOutfamily.length;
    let sum   = await count + index;
    for (let val of this.datafamily){
      this.dataOutfamily.push(val);
    }
    await this.storage.set('formfamily',this.dataOutfamily);
    let data = await this.storage.get('formfamily');
    
    if(data[sum].RESPONSE == undefined){
            
    }else{
      this.router.navigateByUrl('/formthree/form-response/'+sum);
    }
  }
  async btnApprove(){
    let i = 1;
    for (const val of this.datafamily){
      this.personNo = i++;
      let NO1 = val.NO1 == undefined ? 0 : val.NO1;
      let NO2 = val.NO2 == undefined ? 0 : val.NO2;
      const formData = new FormData();
      formData.append('cat_id',"3");
      formData.append('user_id',val.userID);
      formData.append('date_start',val.dateStart);
      formData.append('date_success',val.dateSuccess);
      formData.append('organization_name',val.organization_name == undefined ? "" : val.organization_name);
      formData.append('MEMBER',val.MEMBER == undefined ? "" : val.MEMBER);
      // formData.append('PERSON_NO',val.PERSON_NO == undefined ? "" : val.PERSON_NO);
      formData.append('PERSON_NO',this.personNo);
      formData.append('SEX',val.SEX == undefined ? "" : val.SEX);
      formData.append('AGE',val.AGE == undefined ? "" : val.AGE);
      formData.append('CWT',val.CWT == undefined ? "" : val.CWT);
      formData.append('TMP',val.TMP == undefined ? "" : val.TMP);
      formData.append('ID1',val.ID1 == undefined ? "" : val.ID1);
      formData.append('VIL',val.VIL == undefined ? "" : val.VIL);
      formData.append('MOO',val.MOO == undefined ? "" : val.MOO);
      formData.append('A1',val.A1 == undefined ? "" : val.A1);
      formData.append('NAME',val.NAME == undefined ? "" : val.NAME);
      formData.append('ADDRESS',val.ADDRESS == undefined ? "" : val.ADDRESS);
      formData.append('LAT',val.LAT == undefined ? "" : val.LAT);
      formData.append('LONG',val.LONG == undefined ? "" : val.LONG);
      formData.append('SMOKE',val.SMOKE == undefined ? "" : val.SMOKE);
      formData.append('EVERSMOKE',val.EVERSMOKE == undefined ? "" : val.EVERSMOKE);
      formData.append('EXSMOKE_Y',val.EXSMOKE_Y == undefined ? "" : val.EXSMOKE_Y);
      formData.append('EXSMOKE_M',val.EXSMOKE_M == undefined ? "" : val.EXSMOKE_M);
      formData.append('TIME_Y',val.TIME_Y == undefined ? "" : val.TIME_Y);
      formData.append('TIME_M',val.TIME_M == undefined ? "" : val.TIME_M);
      formData.append('CIG',val.CIG == undefined ? "" : val.CIG);
      formData.append('ROLL',val.ROLL == undefined ? "" : val.ROLL);
      formData.append('E_CIG',val.E_CIG == undefined ? "" : val.E_CIG);
      formData.append('OTHER',val.OTHER == undefined ? "" : val.OTHER);
      formData.append('NO1',NO1);
      formData.append('NO2',NO2);
      formData.append('RESPONSE',val.RESPONSE == undefined ? "" : val.RESPONSE);
      formData.append('TYPE_CIG',val.TYPE_CIG == undefined ? "" : val.TYPE_CIG);
      formData.append('SECOND',val.SECOND == undefined ? "" : val.SECOND);
      formData.append('QUITE_CHECK',val.QUITE_CHECK == undefined ? "" : val.QUITE_CHECK);
      this.api.postdata('reportQuestion',formData).subscribe((res)=>{
        if(res.result == "success"){
          
        }
      },(err)=>{
        this.errorServer();
      });
      this.updateDatafamily();
    }
    await this.presentAlertConfirm();
  }
  async updateDatafamily(){
    await this.storage.set('formFamilySuccess',this.datafamily);
    await this.storage.set('formfamily',this.dataOutfamily);
  }
  async errorServer(){
    await this.storage.set('formFamilyFailed',this.datafamily);
    await this.storage.set('formfamily',this.dataOutfamily);
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '??????????????????!',
      message: '?????????????????????????????????????????????????????????',
      backdropDismiss:false,
      buttons: [
        {
          text: '????????????',
          handler: () => {
            this.router.navigateByUrl('tabs/form');
          }
        }
      ]
    });

    await alert.present();
  }
}
