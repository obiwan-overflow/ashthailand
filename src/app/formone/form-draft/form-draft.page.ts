import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-draft',
  templateUrl: './form-draft.page.html',
  styleUrls: ['./form-draft.page.scss'],
})
export class FormDraftPage implements OnInit {
  dataStorage:any = [];
  constructor(
    public storage:Storage,
    public loadingController:LoadingController,
    public router:Router
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    await loading.present();
    this.dataStorage = await this.storage.get('formpublic');
    await loading.dismiss();
    // let data = await this.storage.get('formpublic');
    // for (let val of data){
    //   if(val.status !== 'success'){
    //     this.dataStorage.push(val);
    //   }
    // }
    // await loading.dismiss();
  }

  async formContinue(key){
    if(this.dataStorage[key].P5A == undefined){
      if(this.dataStorage[key].P4A == undefined){
        if(this.dataStorage[key].P3A == undefined){
          if(this.dataStorage[key].P2A == undefined){
            if(this.dataStorage[key].P1A == undefined){
              this.router.navigateByUrl('/formone/form4/'+key);
            }else{
              this.router.navigateByUrl('/formone/form-step1/'+key);
            }
          }else{
            this.router.navigateByUrl('/formone/form-step2/'+key);
          }
        }else{
          this.router.navigateByUrl('/formone/form-step3/'+key);
        }
      }else{
        this.router.navigateByUrl('/formone/form-step4/'+key);
      }
    }
  }
}
