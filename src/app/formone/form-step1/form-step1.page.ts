import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step1',
  templateUrl: './form-step1.page.html',
  styleUrls: ['./form-step1.page.scss'],
})
export class FormStep1Page implements OnInit {

  dataStorage:any = [];
  numberId:any;
  titlePub:any;
  constructor(
    public router:Router,
    public storage:Storage,
    public loadingController:LoadingController,
    public auth:AuthService,
    public route:ActivatedRoute
  ) {
    this.titlePub = this.auth.titlePublic();
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
    
    this.numberId    = await this.route.snapshot.paramMap.get('id');
    this.dataStorage = await this.storage.get('formpublic');
  }
  async form(event){
    let value = event.srcElement.id;
    
    // value
    this.dataStorage[this.numberId].P1A = value;

    await this.storage.set('formpublic',this.dataStorage);
    if(value == "1"){
      await this.router.navigateByUrl('formone/form-step2/'+this.numberId);
    }else if(value == "2"){     
      await this.router.navigateByUrl('formone/form-step4/'+this.numberId);
    }
  }
}
