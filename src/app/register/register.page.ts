import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { AlertController,LoadingController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(
    public router: Router,
    public api:RestApiService,
    public loadingController:LoadingController,
    public alertController:AlertController,
    private formBuilder: FormBuilder
  ) {
    this.todo = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]*')]],
      confirmpassword: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]*')]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      subdistrict: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.loadDataselect();
  }
  async formRegsiter(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ลงทะเบียน!',
      message: 'ยืนยันการบันทึกข้อมูล',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ตกลง',
          handler: () => {
            const formData = new FormData();
            if(this.todo.value.password !== this.todo.value.confirmpassword){
              this.passwordNotmatch = true;
            }else{
              formData.append('username',this.todo.value.username);
              formData.append('password',this.todo.value.password);
              formData.append('name',this.todo.value.name);
              formData.append('lastname',this.todo.value.lastname);
              formData.append('phone',this.todo.value.phone);
              formData.append('subdistrict',this.todo.value.subdistrict);
              formData.append('district',this.todo.value.district);
              formData.append('province',this.todo.value.province);
              
              this.api.postdata('member/register',formData).subscribe((res)=>{
                if(res.result == 'success'){
                  this.router.navigateByUrl('register-success');
                }
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }
  async loadDataselect(){
    await this.api.getdata('member/getProvinces').subscribe((res)=>{
      this.dataProvince = res.detail;
    });
  }
  async getAmphures(event){
    await this.api.getdata('member/getAmphures&id_provinces='+event.detail.value).subscribe((res)=>{
      this.dataAmphures = res.detail;
    });
  }
  async getTombons(event){
    console.log(event.detail.value);
    let idProvinces = event.detail.value.split("-")[0];
    let idAmphures = event.detail.value.substring(event.detail.value.indexOf("-") + 1);

    await this.api.getdata('member/getTombons&id_provinces='+idProvinces+'&id_amphures='+idAmphures).subscribe((res)=>{
      this.dataTombons = res.detail;
    });
  }
}
