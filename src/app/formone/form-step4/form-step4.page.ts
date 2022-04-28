import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { AlertController,LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step4',
  templateUrl: './form-step4.page.html',
  styleUrls: ['./form-step4.page.scss'],
})
export class FormStep4Page implements OnInit {
  dataStorage:any = [];
  dataPublicSuccess:any = [];
  dataPublicNoInternet:any = [];
  userData:any = [];
  titlePub:any;
  numberId:any;
  constructor(
    public router:Router,
    public storage:Storage,
    public api:RestApiService,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public auth:AuthService,
    public route:ActivatedRoute
  ) {
    this.titlePub = this.auth.titlePublic();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();

    this.dataStorage  = await this.storage.get('formpublic');
    this.userData     = await this.storage.get('userData');
    this.numberId     = await this.route.snapshot.paramMap.get('id');
  }
  async form(event){
    let value = event.srcElement.id;
    this.dataStorage[this.numberId].P4A = value;
    
    await this.storage.set('formpublic',this.dataStorage);

    if(value == "4"){
      await this.router.navigateByUrl('formone/form-step5/'+this.numberId);
    }else{
      this.formConfirm(value);
    }
  }
  async formConfirm(value){
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
            this.setDataSuccess(value);
            // this.dataStorage[this.numberId].status = "success";
            // this.storage.set('formpublic',this.dataStorage);
            const formData = new FormData();
            formData.append('cat_id',"1");
            formData.append('user_id',this.userData.id);
            formData.append('organization_name',this.userData.organization_name);
            formData.append('CWT',this.dataStorage[this.numberId].CWT);
            formData.append('TMP',this.dataStorage[this.numberId].TMP);
            formData.append('ID1',this.dataStorage[this.numberId].ID1);
            formData.append('VIL',this.dataStorage[this.numberId].VIL);
            formData.append('MOO',this.dataStorage[this.numberId].MOO);
            formData.append('A1',this.dataStorage[this.numberId].A1);
            formData.append('NAME',this.dataStorage[this.numberId].NAME);
            formData.append('ADDRESS',this.dataStorage[this.numberId].ADDRESS);
            formData.append('LAT',this.dataStorage[this.numberId].LAT);
            formData.append('LONG',this.dataStorage[this.numberId].LONG);
            formData.append('P1A',this.dataStorage[this.numberId].P1A);
            formData.append('P2A',this.dataStorage[this.numberId].P2A);
            formData.append('P3A',this.dataStorage[this.numberId].P3A);
            formData.append('P4A',value);
            formData.append('P5A',"");
            this.api.postdata('reportQuestion',formData).subscribe((res)=>{
              if(res.result == 'success'){
                this.router.navigateByUrl('tabs/form');
              }
            },(err)=>{
              this.errorServer(value);
            });
            this.deleteDataOld();
          }
        }
      ]
    });
    await alert.present();
  }
  async setDataSuccess(value){
    this.dataPublicSuccess = await this.storage.get('formPublicSuccess');
    if(this.dataPublicSuccess == null){
      this.dataPublicSuccess = [];
    }
    let data = {
      "userId":this.userData.id,
      "organization_name":this.userData.organization_name,
      "CWT":this.dataStorage[this.numberId].CWT,
      "TMP":this.dataStorage[this.numberId].TMP,
      "ID1":this.dataStorage[this.numberId].ID1,
      "VIL":this.dataStorage[this.numberId].VIL,
      "MOO":this.dataStorage[this.numberId].MOO,
      "A1":this.dataStorage[this.numberId].A1,
      "NAME":this.dataStorage[this.numberId].NAME,
      "ADDRESS":this.dataStorage[this.numberId].ADDRESS,
      "LAT":this.dataStorage[this.numberId].LAT,
      "LONG":this.dataStorage[this.numberId].LONG,
      "P1A":this.dataStorage[this.numberId].P1A,
      "P2A":this.dataStorage[this.numberId].P2A,
      "P3A":this.dataStorage[this.numberId].P3A,
      "P4A":value,
    };
    await this.dataPublicSuccess.push(data);
    await this.storage.set('formPublicSuccess',this.dataPublicSuccess);
  }
  async errorServer(value){
    this.dataPublicNoInternet = await this.storage.get('formPublicFailed');
    if(this.dataPublicNoInternet == null){
      this.dataPublicNoInternet = [];
    }
    let data = {
      "userId":this.userData.id,
      "organization_name":this.userData.organization_name,
      "CWT":this.dataStorage[this.numberId].CWT,
      "TMP":this.dataStorage[this.numberId].TMP,
      "ID1":this.dataStorage[this.numberId].ID1,
      "VIL":this.dataStorage[this.numberId].VIL,
      "MOO":this.dataStorage[this.numberId].MOO,
      "A1":this.dataStorage[this.numberId].A1,
      "NAME":this.dataStorage[this.numberId].NAME,
      "ADDRESS":this.dataStorage[this.numberId].ADDRESS,
      "LAT":this.dataStorage[this.numberId].LAT,
      "LONG":this.dataStorage[this.numberId].LONG,
      "P1A":this.dataStorage[this.numberId].P1A,
      "P2A":this.dataStorage[this.numberId].P2A,
      "P3A":this.dataStorage[this.numberId].P3A,
      "P4A":value,
    };
    await this.dataPublicNoInternet.push(data);
    await this.storage.set('formPublicFailed',this.dataPublicNoInternet);
  }
  async deleteDataOld(){
    await this.dataStorage.splice(this.numberId,1);   
    await this.storage.set('formpublic',this.dataStorage);
    await this.router.navigateByUrl('tabs/form');
  }
  async backPage(){
    if(this.dataStorage[this.numberId].P3A){
      this.router.navigateByUrl('formone/form-step3/'+this.numberId);
    }else{
      this.router.navigateByUrl('formone/form-step1/'+this.numberId);
    }
  }
}
