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
    this.dataStorage = await this.storage.get('formshop');
    await loading.dismiss();
  }
  async formContinue(key){
    if(this.dataStorage[key].S6A == undefined){
      if(this.dataStorage[key].S5A == undefined){
        if(this.dataStorage[key].S4A == undefined){
          if(this.dataStorage[key].S3A == undefined){
            if(this.dataStorage[key].S2A == undefined){
              if(this.dataStorage[key].S1A == undefined){
                this.router.navigateByUrl('/formtwo/form4/'+key);
              }else{
                this.router.navigateByUrl('/formtwo/form-step1/'+key);
              }
            }else{
              this.router.navigateByUrl('/formtwo/form-step2/'+key);
            }
          }else{
            this.router.navigateByUrl('/formtwo/form-step3/'+key);
          }
        }else{
          this.router.navigateByUrl('/formtwo/form-step4/'+key);
        }
      }else{
        this.router.navigateByUrl('/formtwo/form-step5/'+key);
      }
    }else{
      this.router.navigateByUrl('/formtwo/form-step6/'+key);
    }
  }
}
