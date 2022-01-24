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
  constructor(private storage: Storage,public router:Router,public loadingController:LoadingController) {
    this.storage.get('fullname').then((data)=>{
      this.fullname = data;
    });
  }

  async tabForm(){
    if(this.fullname == undefined){
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'กรุณาเข้าสู่ระบบ ...',
        duration: 1000
      });
      loading.present();
    }else{
      this.router.navigateByUrl('tabs/form');
    }
  }
  async tabReport(){
    if(this.fullname == undefined){
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'กรุณาเข้าสู่ระบบ ...',
        duration: 1000
      });
      loading.present();
    }else{
      this.router.navigateByUrl('tabs/report');
    }
  }

}
