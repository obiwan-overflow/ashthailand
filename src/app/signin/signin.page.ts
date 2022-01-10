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
        this.route.navigateByUrl('home-new');
        loading.present();
      }else{
        this.loginfailed();
      }
    });
  }
  async loginfailed(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Failed !',
      duration: 2000
    });
    loading.present();
  }

}
class Formlogin {
  username:any;
  password:any;
}