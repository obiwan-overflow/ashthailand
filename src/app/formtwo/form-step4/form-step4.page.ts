import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step4',
  templateUrl: './form-step4.page.html',
  styleUrls: ['./form-step4.page.scss'],
})
export class FormStep4Page implements OnInit {
  dataStorage: any = [];
  titleShop:any;
  numberId:any;
  constructor(
    public router:Router,
    public storage:Storage,
    public loadingController:LoadingController,
    public auth:AuthService,
    public route:ActivatedRoute
  ) {
    this.titleShop = this.auth.titleShop();
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
    this.dataStorage = await this.storage.get('formshop');
  }
  async form(event){
    let value = event.srcElement.id;
    this.dataStorage[this.numberId].S4A = value;
    
    await this.storage.set('formshop',this.dataStorage);
    await this.router.navigateByUrl('formtwo/form-step5/'+this.numberId);
  }
  async backPage(){
    this.router.navigateByUrl('formtwo/form-step3/'+this.numberId);
  }
}
