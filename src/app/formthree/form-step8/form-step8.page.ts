import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-step8',
  templateUrl: './form-step8.page.html',
  styleUrls: ['./form-step8.page.scss'],
})
export class FormStep8Page implements OnInit {

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
    // this.dataStorage[this.id].TIME_M  = this.dataStorage.TIME_M === undefined ? "" : this.dataStorage.TIME_M;
    // this.dataStorage[this.id].NO1     = this.dataStorage.NO1 === undefined ? "" : this.dataStorage.NO1;
    // this.dataStorage[this.id].NO2     = this.dataStorage.NO2 === undefined ? "" : this.dataStorage.NO2;
    this.dataStorage[this.id].OTHER   = answerVal;
    
    await this.storage.set('formfamily',this.dataStorage);

    if(answerVal !== '2' || this.dataStorage[this.id].CIG !== '2' || this.dataStorage[this.id].ROLL !== '2' || this.dataStorage[this.id].E_CIG !== '2'){
      await this.router.navigateByUrl('formthree/form-response/'+this.id);
    }else{
      this.presentAlertConfirm();
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'ต้องมีการสูบอย่างน้อย 1 ประเภท !!!',
      backdropDismiss:false,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.router.navigateByUrl('formthree/form-step5/'+this.id);
          }
        }
      ]
    });

    await alert.present();
  }
}
