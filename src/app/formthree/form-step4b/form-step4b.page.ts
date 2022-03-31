import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-step4b',
  templateUrl: './form-step4b.page.html',
  styleUrls: ['./form-step4b.page.scss'],
})
export class FormStep4bPage implements OnInit {

  dataStorage:any = [];
  id:any;
  private ionicForm:FormGroup;
  constructor(
    public storage:Storage,
    public api:RestApiService,
    public router:Router,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public formBuilder:FormBuilder,
    public route:ActivatedRoute
  ) {
    this.ionicForm = this.formBuilder.group({
      month: ['',[Validators.required]]
    });
  }

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
  async Form(){
    let month = this.ionicForm.value.month;
    this.dataStorage[this.id].TIME_M = month;
   
    await this.storage.set('formfamily',this.dataStorage);
    await this.router.navigateByUrl('formthree/form-step5/'+this.id);
  }
  async stop(){
    this.router.navigateByUrl('/formthree/form-family-lists/'+this.dataStorage[this.id].MOO+'/'+this.dataStorage[this.id].VIL+'/'+this.dataStorage[this.id].A1+'/success');
  }
}
