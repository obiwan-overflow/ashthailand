import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  fullname:any;
  permission:boolean;
  constructor(
    private storage: Storage,
    public router:Router,
    public loadingController:LoadingController
  ) {
   
  }
  async ionViewWillEnter(){
    this.fullname   = await this.storage.get('fullname');
    await this.storage.get('userData').then((res)=>{
      if(res.permission == '1'){
        this.permission = false;
      }else if(res.permission == '2'){
        this.permission = true;
      }
    });
  }
  async tabForm(){
    if(this.fullname == undefined){
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'กรุณาเข้าสู่ระบบ ...',
        duration: 3000
      });
      loading.present();
      this.router.navigateByUrl('signin');
    }else{
      this.router.navigateByUrl('tabs/form');
    }
  }
  async tabReport(){
    if(this.fullname == undefined){
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'กรุณาเข้าสู่ระบบ ...',
        duration: 3000
      });
      loading.present();
      this.router.navigateByUrl('signin');
    }else{
      this.router.navigateByUrl('tabs/report');
    }
  }
  async home(){
    this.router.navigateByUrl('home-new');
  }

}
