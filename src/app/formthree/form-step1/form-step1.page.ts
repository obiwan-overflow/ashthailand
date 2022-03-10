import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-form-step1',
  templateUrl: './form-step1.page.html',
  styleUrls: ['./form-step1.page.scss'],
})
export class FormStep1Page implements OnInit {
  dataStorage:any = [];
  id:any;
  constructor(
    public router:Router,
    public storage:Storage,
    public loadingController:LoadingController,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.id = await this.route.snapshot.paramMap.get('id');
    await this.storage.get('formfamily').then((data)=>{
      this.dataStorage = data;
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async form(event){
    let answerVal = event.srcElement.id;
    this.dataStorage[this.id].SMOKE = answerVal;
    await this.storage.set('formfamily',this.dataStorage);

    if(answerVal == "1"){
      await this.router.navigateByUrl('formthree/form-step2/'+this.id);
    }else{
      await this.router.navigateByUrl('formthree/form-step4/'+this.id);
    }
  }
}
