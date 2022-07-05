import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formlogin:Formlogin;
  loginfail:any;
  constructor(
    public route: Router,
    public api:RestApiService,
    private storage: Storage,
    public loadingController:LoadingController,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.formlogin = new Formlogin();
  }
  async signin(){
    await this.api.getdata('member/login&username='+this.formlogin.username+'&password='+this.formlogin.password).subscribe(res=>{
      if(res.result == 'success'){
        this.api.getdata('member/getProvincesList&id_province='+res.detail.province+'&id_amphures='+res.detail.district+'&id_tombons='+res.detail.subdistrict).subscribe((data)=>{
          this.storage.set('provincesDetail',data.detail);
          this.setuser(res);
        });
      }else{
        this.loginfailed();
      }
    });
  }
  async setuser(data){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
   
    await this.storage.set('userId',data.detail.id);
    await this.storage.set('fullname',data.detail.name+" "+data.detail.lastname);
    await this.storage.set('userData',data.detail);
    await location.assign('home-new');
    await loading.present();
  }
  async loginfailed(){
    this.loginfail = "username หรือรหัสผ่านของท่านไม่ถูกต้อง";
  }

  async condition(){
    await this.iab.create('https://tobaccoevaluation.com/app/','_blank','location=yes');  
  }

}
class Formlogin {
  username:any;
  password:any;
}