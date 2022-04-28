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
    this.MOO            = await this.route.snapshot.paramMap.get('MOO').replace("*kk*","/");
    this.VIL            = await this.route.snapshot.paramMap.get('VIL').replace("*kk*","/");
    this.A1             = await this.route.snapshot.paramMap.get('A1').replace("*kk*","/");
    this.status         = await this.route.snapshot.paramMap.get('status');
    this.dataStorageAll = await this.storage.get('formfamily');

    for (const val of this.dataStorageAll){
      if(val.MOO == this.MOO && val.VIL == this.VIL && val.A1 == this.A1){
        this.detail = val;
        if(val.PERSON_NO !== undefined){
          this.datafamily.push(val);
        }
      }else{
        this.dataOutfamily.push(val);
      }
    }
  }
  async ionViewWillLeave(){
    this.datafamily = [];
    this.dataOutfamily = [];
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
  async btnDelete(del,name){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ยืนยันการลบข้อมูล!',
      message: name,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.deleteMemberFamily(del);
          }
        }
      ]
    });
    await alert.present();
  }
  async deleteMemberFamily(del){  
    let loadingDelete = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    await loadingDelete.present();
    await this.datafamily.splice(del,1);
    for (let val of this.datafamily){
      this.dataOutfamily.push(val);
    }
    await this.storage.set('formfamily',this.dataOutfamily);
    await location.assign('formthree/form-family-lists/'+this.MOO+'/'+this.VIL+'/'+this.A1+'/success')
    await loadingDelete.dismiss();
  }
  async continue(index,name){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ทำแบบสัมภาษณ์ต่อ!',
      message: name,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'ยืนยัน',
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
    if(data[sum].QUITE_CHECK == undefined){
      if(data[sum].SECOND == undefined){
        if(data[sum].TYPE_CIG == undefined){
          if(data[sum].RESPONSE == undefined){
            if(data[sum].OTHER == undefined){
              if(data[sum].E_CIG == undefined){
                if(data[sum].NO2 == undefined){
                  if(data[sum].ROLL == undefined){
                    if(data[sum].NO1 == undefined){
                      if(data[sum].CIG == undefined){
                        if(data[sum].TIME_M == undefined){
                          if(data[sum].TIME_Y == undefined){
                            if(data[sum].EXSMOKE_M == undefined){
                              if(data[sum].EXSMOKE_Y == undefined){
                                if(data[sum].EVERSMOKE == undefined){
                                  if(data[sum].SMOKE == undefined){
                                    this.router.navigateByUrl('/formthree/form4/'+sum);
                                  }else{
                                    this.router.navigateByUrl('/formthree/form-step1/'+sum);
                                  }
                                }else{
                                  this.router.navigateByUrl('/formthree/form-step2/'+sum);
                                }
                              }else{
                                this.router.navigateByUrl('/formthree/form-step3/'+sum);
                              }
                            }else{
                              this.router.navigateByUrl('/formthree/form-step3b/'+sum);
                            }
                          }else{
                            this.router.navigateByUrl('/formthree/form-step4/'+sum);
                          }
                        }else{
                          this.router.navigateByUrl('/formthree/form-step4b/'+sum);
                        }
                      }else{
                        this.router.navigateByUrl('/formthree/form-step5/'+sum);
                      }
                    }else{
                      this.router.navigateByUrl('/formthree/form-step5-count/'+sum);
                    }
                  }else{
                    this.router.navigateByUrl('/formthree/form-step6/'+sum);
                  }
                }else{
                  this.router.navigateByUrl('/formthree/form-step6-count/'+sum);
                }
              }else{
                this.router.navigateByUrl('/formthree/form-step7/'+sum);
              }
            }else{
              this.router.navigateByUrl('/formthree/form-step8/'+sum);
            }
          }else{
            this.router.navigateByUrl('/formthree/form-response/'+sum);
          }
        }else{
          this.router.navigateByUrl('/formthree/form-step10/'+sum);
        }
      }else{
        this.router.navigateByUrl('/formthree/form-step11/'+sum);
      }
    }else{
      this.router.navigateByUrl('/formthree/form-step12/'+sum);
    }
  }
  async btnApprove(){
    const userData = await this.storage.get('userData');
    for (const val of this.datafamily){
      let NO1 = val.NO1 == undefined ? 0 : val.NO1;
      let NO2 = val.NO2 == undefined ? 0 : val.NO2;
      const formData = new FormData();
      formData.append('cat_id',"3");
      formData.append('user_id',userData.id);
      formData.append('organization_name',val.organization_name == undefined ? "" : val.organization_name);
      formData.append('MEMBER',val.MEMBER == undefined ? "" : val.MEMBER);
      formData.append('PERSON_NO',val.PERSON_NO == undefined ? "" : val.PERSON_NO);
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
      formData.append('EXSMOKE_M ',val.EXSMOKE_M  == undefined ? "" : val.EXSMOKE_M );
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
      header: 'สำเร็จ!',
      message: 'เก็บข้อมูลเรียบร้อย',
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
