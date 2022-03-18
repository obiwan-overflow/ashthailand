import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-form-draft',
  templateUrl: './form-draft.page.html',
  styleUrls: ['./form-draft.page.scss'],
})
export class FormDraftPage implements OnInit {
  dataStorage:any = [];
  constructor(
    public storage:Storage,
    public loadingController:LoadingController
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    await loading.present();

    let data = await this.storage.get('formpublic');
    for (let val of data){
      if(val.status !== 'success'){
        this.dataStorage.push(val);
      }
    }
    await loading.dismiss();
  }

  async formContinue(key){
    let data = await this.storage.get('formpublic');
    
  }
}
