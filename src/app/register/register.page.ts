import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  status:any;
  constructor(public router: Router,public api:RestApiService,public loadingController:LoadingController,public alertController:AlertController) {

  }

  ngOnInit() {
  }
  todo = {
    name: '',
    lastname: '',
    username: '',
    password: ''
  };
  async formRegsiter(form){
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
            console.log('Confirm Okay');
            if(form.value.name == "" || form.value.lastname == "" || form.value.username == "" || form.value.password == ""){
              this.status = true;
            }else{
              const formData = new FormData();
              formData.append('name',form.value.name);
              formData.append('lastname',form.value.lastname);
              formData.append('username',form.value.username);
              formData.append('password',form.value.password);
              
              this.api.postdata('member/register',formData).subscribe((res)=>{
                if(res.result == 'success'){
                  this.router.navigateByUrl('register-success');
                }
                console.log(res);
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
