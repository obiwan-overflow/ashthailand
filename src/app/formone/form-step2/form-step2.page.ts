import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step2',
  templateUrl: './form-step2.page.html',
  styleUrls: ['./form-step2.page.scss'],
})
export class FormStep2Page implements OnInit {
  dataStorage:any = [];
  titlePub:any;
  numberId:any;
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

    this.dataStorage = await this.storage.get('formpublic');
    this.numberId    = await this.route.snapshot.paramMap.get('id');
  }
  async form(event){
    let value = event.srcElement.id;
    
    this.dataStorage[this.numberId].P2A = value;
   
    await this.storage.set('formpublic',this.dataStorage);
    await this.router.navigateByUrl('formone/form-step3/'+this.numberId);
  }
}
