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
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await this.api.getdata('member/login&username='+this.formlogin.username+'&password='+this.formlogin.password).subscribe(res=>{
      if(res.result == 'success'){
        this.storage.set('userId',res.detail.id);
        this.storage.set('fullname',res.detail.name+" "+res.detail.lastname);
        this.route.navigateByUrl('home-new');
        // window.location.assign('home-new');
        loading.present();
      }else{
        this.loginfailed();
      }
    });
  }
  async loginfailed(){
    this.loginfail = "username หรือรหัสผ่านของท่านไม่ถูกต้อง";
  }

}
class Formlogin {
  username:any;
  password:any;
}