import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-step6',
  templateUrl: './form-step6.page.html',
  styleUrls: ['./form-step6.page.scss'],
})
export class FormStep6Page implements OnInit {

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
    this.dataStorage[this.id].ROLL    = answerVal;
   
    await this.storage.set('formfamily',this.dataStorage);
    if(answerVal == "1"){
      await this.router.navigateByUrl('formthree/form-step6-count/'+this.id);
    }else{
      await this.router.navigateByUrl('formthree/form-step7/'+this.id);
    }
  }
  async stop(){
    this.router.navigateByUrl('/formthree/form-family-lists/'+this.dataStorage[this.id].MOO+'/'+this.dataStorage[this.id].VIL+'/'+this.dataStorage[this.id].A1+'/success');
  }
  async backPage(){
    if(this.dataStorage[this.id].NO1 == null || this.dataStorage[this.id].NO1 == undefined){
      this.router.navigateByUrl('/formthree/form-step5/'+this.id);
    }else{
      this.router.navigateByUrl('/formthree/form-step5-count/'+this.id);
    }
  }
}
