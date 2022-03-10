import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-step5',
  templateUrl: './form-step5.page.html',
  styleUrls: ['./form-step5.page.scss'],
})
export class FormStep5Page implements OnInit {

  dataStorage:any = [];
  id:any;
  constructor(
    public storage:Storage,
    public api:RestApiService,
    public router:Router,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.id = await this.route.snapshot.paramMap.get('id');
    this.dataStorage = await this.storage.get('formfamily');

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async form(event){
    let answerVal = event.srcElement.id;
    // this.dataStorage[this.id].TIME_M = this.dataStorage.TIME_M === undefined ? "" : this.dataStorage.TIME_M;
    this.dataStorage[this.id].CIG = answerVal;
    await this.storage.set('formfamily',this.dataStorage);

    if(answerVal == "1"){
      await this.router.navigateByUrl('formthree/form-step5-count/'+this.id);
    }else{
      await this.router.navigateByUrl('formthree/form-step6/'+this.id);
    }
  }
}
