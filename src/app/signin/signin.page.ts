import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formlogin:Formlogin;
  loginfail:any;
  constructor(public route: Router,public api:RestApiService,private storage: Storage,public loadingController:LoadingController) { }

  ngOnInit() {
    this.formlogin = new Formlogin();
  }
  async signin(){
    await this.api.getdata('member/login&username='+this.formlogin.username+'&password='+this.formlogin.password).subscribe(res=>{
      if(res.result == 'success'){
        this.setuser(res);
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
    await this.api.getdata('member/getProvincesList&id_province='+data.detail.province+'&id_amphures='+data.detail.district+'&id_tombons='+data.detail.subdistrict).subscribe((res)=>{
      this.storage.set('provincesDetail',res.detail);
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

}
class Formlogin {
  username:any;
  password:any;
}