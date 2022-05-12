import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step6',
  templateUrl: './form-step6.page.html',
  styleUrls: ['./form-step6.page.scss'],
})
export class FormStep6Page implements OnInit {
  dataStorage: any = [];
  dataShopSuccess:any = [];
  dataShop:any = [];
  userData:any = [];
  titleShop:any;
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
    this.titleShop = this.auth.titleShop();
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
    this.numberId     = await this.route.snapshot.paramMap.get('id');
    this.dataStorage  = await this.storage.get('formshop');
    this.userData     = await this.storage.get('userData');
  }
  async form(event){
    let value = event.srcElement.id;
    this.dataStorage[this.numberId].S6A = value;
   
    await this.storage.set('formshop',this.dataStorage);
    this.formConfirm(value);
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

            const formData = new FormData();
            formData.append('cat_id',"2");
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
            formData.append('S1A',this.dataStorage[this.numberId].S1A);
            formData.append('S2A',this.dataStorage[this.numberId].S2A);
            formData.append('S3A',this.dataStorage[this.numberId].S3A);
            formData.append('S4A',this.dataStorage[this.numberId].S4A);
            formData.append('S5A',this.dataStorage[this.numberId].S5A);
            formData.append('S6A',value);
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
    this.dataShopSuccess = await this.storage.get('formShopSuccess');
    if(this.dataShopSuccess == null){
      this.dataShopSuccess = [];
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
      "S1A":this.dataStorage[this.numberId].S1A,
      "S2A":this.dataStorage[this.numberId].S2A,
      "S3A":this.dataStorage[this.numberId].S3A,
      "S4A":this.dataStorage[this.numberId].S4A,
      "S5A":this.dataStorage[this.numberId].S5A,
      "S6A":value,
      "dateStart":this.dataStorage[this.numberId].dateStart,
      "dateSuccess":Date()
    };
    await this.dataShopSuccess.push(data);
    await this.storage.set('formShopSuccess',this.dataShopSuccess);
    // await this.dataStorage.splice(this.numberId,1);   
    // await this.storage.set('formshop',this.dataStorage);
  }
  async errorServer(value){
    this.dataShop = await this.storage.get('formShopFailed');
    if(this.dataShop == null){
      this.dataShop = [];
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
      "S1A":this.dataStorage[this.numberId].S1A,
      "S2A":this.dataStorage[this.numberId].S2A,
      "S3A":this.dataStorage[this.numberId].S3A,
      "S4A":this.dataStorage[this.numberId].S4A,
      "S5A":this.dataStorage[this.numberId].S5A,
      "S6A":value,
      "dateStart":this.dataStorage[this.numberId].dateStart,
      "dateSuccess":Date()
    };
    await this.dataShop.push(data);
    await this.storage.set('formShopFailed',this.dataShop);
  }
  async deleteDataOld(){
    await this.dataStorage.splice(this.numberId,1);   
    await this.storage.set('formshop',this.dataStorage);
    await this.router.navigateByUrl('tabs/form');
  }
  async backPage(){
    this.router.navigateByUrl('formtwo/form-step5/'+this.numberId);
  }
}
