import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-step10',
  templateUrl: './form-step10.page.html',
  styleUrls: ['./form-step10.page.scss'],
})
export class FormStep10Page implements OnInit {

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
    this.dataStorage[this.id].TYPE_CIG   = answerVal;
    
    await this.storage.set('formfamily',this.dataStorage);
    await this.router.navigateByUrl('formthree/form-step11/'+this.id);
  }
  async stop(){
    this.router.navigateByUrl('/formthree/form-family-lists/'+this.dataStorage[this.id].MOO+'/'+this.dataStorage[this.id].VIL+'/'+this.dataStorage[this.id].A1+'/success');
  }
  async backPage(){
    this.router.navigateByUrl('/formthree/form-response/'+this.id);
  }
}
