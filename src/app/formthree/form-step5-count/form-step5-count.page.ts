import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-step5-count',
  templateUrl: './form-step5-count.page.html',
  styleUrls: ['./form-step5-count.page.scss'],
})
export class FormStep5CountPage implements OnInit {

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
      NO: ['',[Validators.required]]
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
    let answerVal = this.ionicForm.value.NO;
    this.dataStorage[this.id].TIME_M = this.dataStorage.TIME_M === undefined ? "" : this.dataStorage.TIME_M;
    this.dataStorage[this.id].CIG = this.dataStorage.CIG === undefined ? "" : this.dataStorage.CIG;
    this.dataStorage[this.id].NO1 = answerVal;
    
    await this.storage.set('formfamily',this.dataStorage);
    await this.router.navigateByUrl('formthree/form-step6/'+this.id);
  }
}
