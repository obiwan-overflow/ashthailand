import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registertwo',
  templateUrl: './registertwo.page.html',
  styleUrls: ['./registertwo.page.scss'],
})
export class RegistertwoPage implements OnInit {
  dataProvince:any;
  dataAmphures:any = [];
  dataTombons:any = [];
  private todo : FormGroup;
  private dataRegister:any;
  constructor(
    private api:RestApiService,
    public alertController:AlertController,
    private formBuilder: FormBuilder,
    public storage:Storage,
    public router:Router
  ) {
    this.todo = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      subdistrict: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.loadDataselect();
    this.dataRegister = await this.storage.get('dataRegister');
  }
  async loadDataselect(){
    await this.api.getdata('member/getProvinces').subscribe((res)=>{
      this.dataProvince = res.detail;
    });
  }
  async getAmphures(event){
    await this.api.getdata('member/getAmphures&id_provinces='+event.detail.value).subscribe((res)=>{
      for (let index = 0; index < res.detail.length; index++) {
        const element = res.detail[index];
        if(element.amphures !== ''){
          this.dataAmphures.push(element);
        }
      }
    });
  }
  async getTombons(event){
    console.log(event.detail.value);
    let idProvinces = event.detail.value.split("-")[0];
    let idAmphures = event.detail.value.substring(event.detail.value.indexOf("-") + 1);

    await this.api.getdata('member/getTombons&id_provinces='+idProvinces+'&id_amphures='+idAmphures).subscribe((res)=>{
      for (let index = 0; index < res.detail.length; index++) {
        const element = res.detail[index];
        if(element.tombons !== ''){
          this.dataTombons.push(element);
        }
      }
    });
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
            formData.append('permission','2');
            formData.append('username',this.dataRegister.username);
            formData.append('password',this.dataRegister.password);
            formData.append('name',this.dataRegister.name);
            formData.append('lastname',this.dataRegister.lastname);
            formData.append('phone',this.todo.value.phone);
            formData.append('subdistrict',this.todo.value.subdistrict);
            formData.append('district',this.todo.value.district);
            formData.append('province',this.todo.value.province);
            
            this.api.postdata('member/register',formData).subscribe((res)=>{
              if(res.result == 'success'){
                this.storage.remove('dataRegister');
                this.router.navigateByUrl('register-success');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
