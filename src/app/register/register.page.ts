import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { AlertController,LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  status:any;
  passwordNotmatch:boolean;
  private todo : FormGroup;
  dataProvince:any = [];
  dataAmphures:any = [];
  dataTombons:any = [];
  dataRegister:any = {};
  constructor(
    public router: Router,
    public api:RestApiService,
    public loadingController:LoadingController,
    public alertController:AlertController,
    private formBuilder: FormBuilder,
    public storage:Storage
  ) {
    this.todo = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]*')]],
      confirmpassword: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]*')]],
    });
  }
  ngOnInit() {
  }
  async formRegsiter(){
    if(this.todo.value.password !== this.todo.value.confirmpassword){
      this.passwordNotmatch = true;
    }else{
      this.dataRegister.username  = await this.todo.value.username;
      this.dataRegister.password  = await this.todo.value.password;
      await this.storage.set('dataRegister',this.dataRegister);
      await this.router.navigateByUrl('tabs/register/registertwo');
    }
  }
}
