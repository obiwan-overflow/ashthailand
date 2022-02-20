import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  todo:any = [];
  name:any;
  lastname:any;
  organization_name:any;
  province:any;
  district:any;
  subdistrict:any;
  phone:any;
  id:any;
  constructor(
    public api:RestApiService,
    public storage:Storage,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public router:Router,
    public toastController:ToastController,
  ) {
    this.init();
  }

  ngOnInit() {
  }
  async init(){
    await this.storage.get('userData').then((data)=>{
      this.name               = data.name;
      this.lastname           = data.lastname;
      this.organization_name  = data.organization_name;
      this.province           = data.province;
      this.district           = data.district;
      this.subdistrict        = data.subdistrict;
      this.phone              = data.phone;
      this.id                 = data.id;
    });
  }
  async form(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'บันทึก!',
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
          text: 'บันทึก',
          handler: () => {
            console.log('Confirm Okay');
            
            const formData = new FormData();
            formData.append('id',this.id);
            formData.append('name',this.todo.name !== undefined ? this.todo.name : this.name);
            formData.append('lastname',this.todo.lastname !== undefined ? this.todo.lastname : this.lastname);
            formData.append('organization_name',this.todo.organization_name !== undefined ? this.todo.organization_name : this.organization_name);
            formData.append('province',this.todo.province !== undefined ? this.todo.province : this.province);
            formData.append('district',this.todo.district !== undefined ? this.todo.district : this.district);
            formData.append('subdistrict',this.todo.subdistrict !== undefined ? this.todo.subdistrict : this.subdistrict);
            formData.append('phone',this.todo.phone !== undefined ? this.todo.phone : this.phone);
            this.api.postdata('member/editProfile',formData).subscribe((res)=>{
              if(res.result == 'success'){
                this.presentToast();
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'แก้ไขข้อมูลเรียบร้อย',
      duration: 5000,
      color:"success"
    });
    toast.present();
  }
}
