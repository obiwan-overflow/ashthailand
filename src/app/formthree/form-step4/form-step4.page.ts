import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-step4',
  templateUrl: './form-step4.page.html',
  styleUrls: ['./form-step4.page.scss'],
})
export class FormStep4Page implements OnInit {

  dataStorage:any = [];
  private ionicForm:FormGroup;
  constructor(
    public storage:Storage,
    public api:RestApiService,
    public router:Router,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public toastController:ToastController,
    public formBuilder:FormBuilder
  ) {
    this.ionicForm = this.formBuilder.group({
      YEAR: ['',[Validators.required,Validators.max(99)]]
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.dataStorage = await this.storage.get('formfamily');
   
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async Form(){
    let year = this.ionicForm.value.YEAR;
    let dataAnswer = {
      "MEMBER":this.dataStorage.MEMBER,
      "PERSON_NO":this.dataStorage.PERSON_NO,
      "SEX":this.dataStorage.SEX,
      "AGE":this.dataStorage.AGE,
      "CWT":this.dataStorage.CWT,
      "TMP":this.dataStorage.TMP,
      "ID1":this.dataStorage.ID1,
      "VIL":this.dataStorage.VIL,
      "MOO":this.dataStorage.MOO,
      "A1":this.dataStorage.A1,
      "NAME":this.dataStorage.NAME,
      "ADDRESS":this.dataStorage.ADDRESS,
      "LAT":this.dataStorage.LAT,
      "LONG":this.dataStorage.LONG,
      "SMOKE":this.dataStorage.SMOKE,
      "TIME_Y":year
    }
    await this.storage.set('formfamily',dataAnswer);
    if(year < this.dataStorage.AGE){
      if((this.dataStorage.AGE - year) > 6){
        if(year == 0){
          this.router.navigateByUrl('formthree/form-step4b');
        }else{
          this.router.navigateByUrl('formthree/form-step5');
        }
      }else{
        this.ConfirmOrEdit();
      }
    }else if (year == 88){
      this.router.navigateByUrl('formthree/form-step4b');
    }else{
      this.presentAlertConfirm();
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'alertConfirm',
      header: 'ตรวจสอบ!',
      message: 'เพราะบันทึกจำนวนปีที่สูบไม่สัมพันธ์กับอายุปัจจุบัน',
      backdropDismiss:false,
      buttons: [
        {
          text: 'แก้ไข',
          role: 'แก้ไข',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }
  async ConfirmOrEdit() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ตรวจสอบ!',
      message: 'เพราะบันทึกจำนวนปีที่สูบไม่สัมพันธ์กับอายุปัจจุบัน',
      buttons: [
        {
          text: 'แก้ไข',
          role: 'แก้ไข',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.router.navigateByUrl('formthree/form-step5');
          }
        }
      ]
    });

    await alert.present();
  }
}
