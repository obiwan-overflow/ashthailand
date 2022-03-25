import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.page.html',
  styleUrls: ['./home-new.page.scss'],
})
export class HomeNewPage implements OnInit {

  fullname:any;
  titleNoti:any;
  image:any;
  profile:any;
  constructor(private storage: Storage,public router:Router,public loadingController:LoadingController,public api:RestApiService) {
    this.api.getdata('home/noti').subscribe((res)=>{
      this.titleNoti = res.title;
    });
  }

  ngOnInit() {
  }
  async ionViewDidEnter(){
    await this.storage.get('userData').then((data)=>{
        if(data !== null){
          this.fullname = data.name+" "+data.lastname;
          this.image    = data.image == " " ? 'assets/images/user-theme.png' : data.image;
          this.profile  = data.imgProfile;
        }
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
