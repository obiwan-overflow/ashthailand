import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.page.html',
  styleUrls: ['./home-new.page.scss'],
})
export class HomeNewPage implements OnInit {

  fullname:any;
  constructor(private storage: Storage,public router:Router,public loadingController:LoadingController) {
    
  }

  ngOnInit() {
  }
  async ionViewDidEnter(){
    this.storage.get('fullname').then((data)=>{
      this.fullname = data;
    });
  }
  async formanswer(){
    if(this.fullname == undefined){
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'กรุณาเข้าสู่ระบบ ...',
        duration: 2000
      });
      loading.present();
    }else{
      this.router.navigateByUrl('tabs/form');
    }
  }
  async report(){
    if(this.fullname == undefined){
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'กรุณาเข้าสู่ระบบ ...',
        duration: 2000
      });
      loading.present();
    }else{
      this.router.navigateByUrl('tabs/report');
    }
  }
}
