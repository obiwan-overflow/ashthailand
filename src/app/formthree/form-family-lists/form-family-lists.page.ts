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
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.MOO      = await this.route.snapshot.paramMap.get('MOO').replace("*kk*","/");
    this.VIL      = await this.route.snapshot.paramMap.get('VIL').replace("*kk*","/");
    this.A1       = await this.route.snapshot.paramMap.get('A1').replace("*kk*","/");
    this.status   = await this.route.snapshot.paramMap.get('status');
    await this.storage.get('formfamily').then((data)=>{
      this.dataStorageAll = data;
    });
    await this.checkPerson(this.dataStorageAll);
  }
  async checkPerson(data){
    for (const val of data) {
      if(val.MOO == this.MOO && val.VIL == this.VIL && val.A1 == this.A1){
        this.detail = val;
        if(val.PERSON_NO !== undefined){
          this.datafamily.push(val);
        }
      }
    }
    console.log(this.datafamily);
  }
  async updateMember() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'แก้ไขจำนวนสมาชิก!',
      inputs: [
        {
          name: 'update',
          type: 'number',
          placeholder: 'กรุณากรอกจำนวน',
          value: this.dataStorage.MEMBER
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'บันทึก',
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
  // async ionViewWillEnter(){
  //   const loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'กรุณารอสักครู่...',
  //     duration: 200
  //   });
  //   await loading.present();
  //   this.id     = this.route.snapshot.paramMap.get('id');
  //   this.status = this.route.snapshot.paramMap.get('status');
  //   await this.storage.get('formfamily').then((data)=>{
  //     this.dataStorage    = data[this.id];
  //     this.dataStorageAll = data; 
  //   });
  //   await this.checkPerson(this.dataStorageAll);
  // }
  // async checkPerson(data){
  //   for (const val of data){
  //     if(val.MOO == this.dataStorage.MOO && val.VIL == this.dataStorage.VIL && val.A1 == this.dataStorage.A1){
  //       if(val.PERSON_NO !== undefined){
  //         this.datafamily.push(val);
  //       }
  //     }else{
  //       this.dataOutfamily.push(val);
  //     }
  //   }
  // }
  // async btnStart(){
  //   if(this.status == "success"){
  //     let dataAnswer = {
  //       "CWT":this.dataStorage.CWT,
  //       "TMP":this.dataStorage.TMP,
  //       "ID1":this.dataStorage.ID1,
  //       "LAT":this.dataStorage.LAT,
  //       "LONG":this.dataStorage.LONG,
  //       "MOO":this.dataStorage.MOO,
  //       "VIL":this.dataStorage.VIL,
  //       "A1":this.dataStorage.A1,
  //       "MEMBER":this.dataStorage.MEMBER,
  //       "PERSON_NO":this.dataStorage.PERSON_NO + 1,
  //     };
  //     await this.dataStorageAll.push(dataAnswer);
  //     await this.storage.set('formfamily',this.dataStorageAll);
  //     this.dataStorageAll = await this.storage.get('formfamily');
  //     let lastId = this.dataStorageAll.length - 1;
  //     this.router.navigateByUrl('/formthree/form4/'+lastId);
  //   }else if (this.status == "continue"){
  //     this.router.navigateByUrl('/formthree/form4/'+this.id);
  //   }
  // }
  // async btnApprove(){
  //   const userId = await this.storage.get('userId');
  //   for (const val of this.datafamily){
  //     const formData = new FormData();
  //     formData.append('cat_id',"3");
  //     formData.append('user_id',userId);
  //     formData.append('MEMBER',val.MEMBER == undefined ? "" : val.MEMBER);
  //     formData.append('PERSON_NO',val.PERSON_NO == undefined ? "" : val.PERSON_NO);
  //     formData.append('SEX',val.SEX == undefined ? "" : val.SEX);
  //     formData.append('AGE',val.AGE == undefined ? "" : val.AGE);
  //     formData.append('CWT',val.CWT == undefined ? "" : val.CWT);
  //     formData.append('TMP',val.TMP == undefined ? "" : val.TMP);
  //     formData.append('ID1',val.ID1 == undefined ? "" : val.ID1);
  //     formData.append('VIL',val.VIL == undefined ? "" : val.VIL);
  //     formData.append('MOO',val.MOO == undefined ? "" : val.MOO);
  //     formData.append('A1',val.A1 == undefined ? "" : val.A1);
  //     formData.append('NAME',val.NAME == undefined ? "" : val.NAME);
  //     formData.append('ADDRESS',val.ADDRESS == undefined ? "" : val.ADDRESS);
  //     formData.append('LAT',val.LAT == undefined ? "" : val.LAT);
  //     formData.append('LONG',val.LONG == undefined ? "" : val.LONG);
  //     formData.append('SMOKE',val.SMOKE == undefined ? "" : val.SMOKE);
  //     formData.append('EVERSMOKE',val.EVERSMOKE == undefined ? "" : val.EVERSMOKE);
  //     formData.append('EXSMOKE_Y',val.EXSMOKE_Y == undefined ? "" : val.EXSMOKE_Y);
  //     formData.append('EXSMOKE_M ',val.EXSMOKE_M  == undefined ? "" : val.EXSMOKE_M );
  //     formData.append('TIME_Y',val.TIME_Y == undefined ? "" : val.TIME_Y);
  //     formData.append('TIME_M',val.TIME_M == undefined ? "" : val.TIME_M);
  //     formData.append('CIG',val.CIG == undefined ? "" : val.CIG);
  //     formData.append('ROLL',val.ROLL == undefined ? "" : val.ROLL);
  //     formData.append('E_CIG',val.E_CIG == undefined ? "" : val.E_CIG);
  //     formData.append('OTHER',val.OTHER == undefined ? "" : val.OTHER);
  //     formData.append('NO1',(val.NO1 == undefined ? "" : val.NO1) + (val.NO2 == undefined ? "" : val.NO2));
  //     formData.append('RESPONSE',val.RESPONSE == undefined ? "" : val.RESPONSE);
  //     formData.append('TYPE_CIG',val.TYPE_CIG == undefined ? "" : val.TYPE_CIG);
  //     formData.append('SECOND',val.SECOND == undefined ? "" : val.SECOND);
  //     formData.append('QUITE_CHECK',val.QUITE_CHECK == undefined ? "" : val.QUITE_CHECK);
  //     this.api.postdata('reportQuestion',formData).subscribe();
  //   }
  //   await this.presentAlertConfirm();
  // }
  // async updateMember() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'แก้ไขจำนวนสมาชิก!',
  //     inputs: [
  //       {
  //         name: 'update',
  //         type: 'number',
  //         placeholder: 'กรุณากรอกจำนวน',
  //         value: this.dataStorage.MEMBER
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'ยกเลิก',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'บันทึก',
  //         handler: (data) => {
  //           for (const val of this.dataStorageAll){
  //             if(val.MOO == this.dataStorage.MOO && val.VIL == this.dataStorage.VIL && val.A1 == this.dataStorage.A1){
  //               val.MEMBER = data.update;
  //             }
  //           }
  //           this.storage.set('formfamily',this.dataStorageAll);
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
  // async btnDelete(AGE,NAME,A1,MOO,VIL){
  //   let subArray = [];
  //   let newData  = [];
  //   for (let val of this.dataStorageAll){
  //     if(AGE == parseInt(val.AGE) && NAME == val.NAME && A1 == val.A1){

  //     }else{
  //       subArray.push(val);
  //     }
  //   }
  //   await this.storage.set('formfamily',subArray);
  //   await this.storage.get('formfamily').then((data)=>{
  //     for (let val of data){
  //       if(MOO == data.MOO && VIL == data.VIL && A1 == data.A1){
  //         newData = val;
  //       }
  //     }
  //     this.datafamily = newData;
  //   });
  // }
  // async presentAlertConfirm() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'สำเร็จ!',
  //     message: 'เก็บข้อมูลเรียบร้อย',
  //     backdropDismiss:false,
  //     buttons: [
  //       {
  //         text: 'ตกลง',
  //         handler: () => {
  //           this.router.navigateByUrl('tabs/form');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
}
