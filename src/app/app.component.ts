import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AlertController } from '@ionic/angular';
import { RestApiService } from './rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userId:any;
  fullname:any;
  constructor(
    private storage: Storage,
    public route:Router,
    public navCtrl: NavController,
    private network: Network,
    public alertController: AlertController,
    private api:RestApiService
  ) {
    document.addEventListener("offline",()=>{
      // this.alertNetwork();
    });
    document.addEventListener("online",()=>{
      this.updateDataPublic();
      this.updateDataShop();
      this.updateDataFamily();
    });
  }
  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    await this.storage.get('userId').then((data)=>{
      this.userId = data;
    });
    await this.storage.get('fullname').then((data)=>{
      this.fullname = data;
    });
  }
  async logout(){
    await this.storage.remove('userId');
    await this.storage.remove('fullname');
    await this.storage.remove('userData');
    await this.route.navigate(['home-new']);
    await location.reload();
  }
  async alertNetwork(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Network !',
      message: 'การเชื่อมต่อ Internet ของคุณมีปัญหา',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async updateDataPublic(){
    let dataPublic  = await this.storage.get('formPublicFailed');
    if(dataPublic !== undefined || dataPublic !== null || dataPublic !== ""){
      const formData = new FormData();
      formData.append('cat_id',"1");
      formData.append('user_id',dataPublic[0].userId);
      formData.append('organization_name',dataPublic[0].organization_name);
      formData.append('CWT',dataPublic[0].CWT);
      formData.append('TMP',dataPublic[0].TMP);
      formData.append('ID1',dataPublic[0].ID1);
      formData.append('VIL',dataPublic[0].VIL);
      formData.append('MOO',dataPublic[0].MOO);
      formData.append('A1',dataPublic[0].A1);
      formData.append('NAME',dataPublic[0].NAME);
      formData.append('ADDRESS',dataPublic[0].ADDRESS);
      formData.append('LAT',dataPublic[0].LAT);
      formData.append('LONG',dataPublic[0].LONG);
      formData.append('date_start',dataPublic[0].dateStart);
      formData.append('date_success',dataPublic[0].dateSuccess);
      formData.append('P1A',dataPublic[0].P1A);
      formData.append('P2A',dataPublic[0].P2A);
      formData.append('P3A',dataPublic[0].P3A);
      formData.append('P4A',dataPublic[0].P4A);
      formData.append('P5A',dataPublic[0].P5A == undefined ? "" : dataPublic[0].P5A);
      this.api.postdata('reportQuestion',formData).subscribe((res)=>{
        if(res.result == 'success'){
          this.deleteDataPublic();
        }
      },(err)=>{
        alert('การอัพโหลดข้อมูลมีปัญหา');
      });
    }
  }
  async updateDataShop(){
    let dataShop    = await this.storage.get('formShopFailed');
    if(dataShop !== undefined || dataShop !== null || dataShop !== ""){
      const formData = new FormData();
      formData.append('cat_id',"2");
      formData.append('user_id',dataShop[0].userId);
      formData.append('organization_name',dataShop[0].organization_name);
      formData.append('CWT',dataShop[0].CWT);
      formData.append('TMP',dataShop[0].TMP);
      formData.append('ID1',dataShop[0].ID1);
      formData.append('VIL',dataShop[0].VIL);
      formData.append('MOO',dataShop[0].MOO);
      formData.append('A1',dataShop[0].A1);
      formData.append('NAME',dataShop[0].NAME);
      formData.append('ADDRESS',dataShop[0].ADDRESS);
      formData.append('LAT',dataShop[0].LAT);
      formData.append('LONG',dataShop[0].LONG);
      formData.append('date_start',dataShop[0].dateStart);
      formData.append('date_success',dataShop[0].dateSuccess);
      formData.append('S1A',dataShop[0].S1A);
      formData.append('S2A',dataShop[0].S2A);
      formData.append('S3A',dataShop[0].S3A);
      formData.append('S4A',dataShop[0].S4A);
      formData.append('S5A',dataShop[0].S5A);
      formData.append('S6A',dataShop[0].S6A);
      this.api.postdata('reportQuestion',formData).subscribe((res)=>{
        if(res.result == 'success'){
          this.deleteDataShop();
        }
      },(err)=>{
        alert('การอัพโหลดข้อมูลมีปัญหา');
      });
    }
  }
  async updateDataFamily(){
    let dataFamily  = await this.storage.get('formFamilyFailed');
    if(dataFamily !== undefined || dataFamily !== null || dataFamily !== ""){
      const formData = new FormData();
      formData.append('cat_id',"3");
      formData.append('user_id',dataFamily[0].userId);
      formData.append('organization_name',dataFamily[0].organization_name);
      formData.append('MEMBER',dataFamily[0].MEMBER);
      formData.append('PERSON_NO',dataFamily[0].PERSON_NO);
      formData.append('SEX',dataFamily[0].SEX);
      formData.append('AGE',dataFamily[0].AGE);
      formData.append('CWT',dataFamily[0].CWT);
      formData.append('TMP',dataFamily[0].TMP);
      formData.append('ID1',dataFamily[0].ID1);
      formData.append('VIL',dataFamily[0].VIL);
      formData.append('MOO',dataFamily[0].MOO);
      formData.append('A1',dataFamily[0].A1);
      formData.append('NAME',dataFamily[0].NAME);
      formData.append('ADDRESS',dataFamily[0].ADDRESS);
      formData.append('LAT',dataFamily[0].LAT);
      formData.append('LONG',dataFamily[0].LONG);
      formData.append('date_start',dataFamily[0].dateStart);
      formData.append('date_success',dataFamily[0].dateSuccess);
      formData.append('SMOKE',dataFamily[0].SMOKE);
      formData.append('EVERSMOKE',dataFamily[0].EVERSMOKE);
      formData.append('EXSMOKE_Y',dataFamily[0].EXSMOKE_Y);
      formData.append('EXSMOKE_M ',dataFamily[0].EXSMOKE_M);
      formData.append('TIME_Y',dataFamily[0].TIME_Y);
      formData.append('TIME_M',dataFamily[0].TIME_M);
      formData.append('CIG',dataFamily[0].CIG);
      formData.append('ROLL',dataFamily[0].ROLL);
      formData.append('E_CIG',dataFamily[0].E_CIG);
      formData.append('OTHER',dataFamily[0].OTHER);
      formData.append('NO1',dataFamily[0].NO1);
      formData.append('NO2',dataFamily[0].NO2);
      formData.append('RESPONSE',dataFamily[0].RESPONSE);
      formData.append('TYPE_CIG',dataFamily[0].TYPE_CIG);
      formData.append('SECOND',dataFamily[0].SECOND);
      formData.append('QUITE_CHECK',dataFamily[0].QUITE_CHECK);
      this.api.postdata('reportQuestion',formData).subscribe((res)=>{
        if(res.result == 'success'){
          this.deleteDataFamily();
        }
      },(err)=>{
        alert('การอัพโหลดข้อมูลมีปัญหา');
      });
    }
  }
  async deleteDataPublic(){
    let dataPublic  = await this.storage.get('formPublicFailed');
    await dataPublic.splice(0,1);
    await this.storage.set('formPublicFailed',dataPublic);
    await this.updateDataPublic();
  }
  async deleteDataShop(){
    let dataShop  = await this.storage.get('formShopFailed');
    await dataShop.splice(0,1);
    await this.storage.set('formShopFailed',dataShop);
    await this.updateDataShop();
  }
  async deleteDataFamily(){
    let dataFamily  = await this.storage.get('formFamilyFailed');
    await dataFamily.splice(0,1);
    await this.storage.set('formFamilyFailed',dataFamily);
    await this.updateDataFamily();
  }
}
