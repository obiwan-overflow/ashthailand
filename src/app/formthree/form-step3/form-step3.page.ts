import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-step3',
  templateUrl: './form-step3.page.html',
  styleUrls: ['./form-step3.page.scss'],
})
export class FormStep3Page implements OnInit {

  dataStorage:any = [];
  private ionicForm : FormGroup;
  constructor(
    public storage:Storage,
    public api:RestApiService,
    public router:Router,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public toastController:ToastController,
    public formBuilder: FormBuilder
  ) {
    this.ionicForm = this.formBuilder.group({
      YEAR: ['',[Validators.required]]
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
      "EVERSMOKE":this.dataStorage.EVERSMOKE,
      "EXSMOKE_Y":year
    }
    await this.storage.set('formfamily',dataAnswer);
    if(year < this.dataStorage.AGE){
      if((this.dataStorage.AGE - year) > 6){
        if(year == 0){
          this.router.navigateByUrl('formthree/form-step3b');
        }else{
          this.formConfirm(year);
        }
      }else{
        this.ConfirmOrEdit(year);
      }
    }else if (year == 88){
      this.router.navigateByUrl('formthree/form-step3b');
    }else{
      this.presentAlertConfirm();
    }
  }
  async formConfirm(year){
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
            formData.append('cat_id',"3");
            formData.append('MEMBER',this.dataStorage.MEMBER),
            formData.append('PERSON_NO',this.dataStorage.PERSON_NO),
            formData.append('SEX',this.dataStorage.SEX),
            formData.append('AGE',this.dataStorage.AGE),
            formData.append('CWT',this.dataStorage.CWT);
            formData.append('TMP',this.dataStorage.TMP);
            formData.append('ID1',this.dataStorage.ID1);
            formData.append('VIL',this.dataStorage.VIL);
            formData.append('MOO',this.dataStorage.MOO);
            formData.append('A1',this.dataStorage.A1);
            formData.append('NAME',this.dataStorage.NAME);
            formData.append('ADDRESS',this.dataStorage.ADDRESS);
            formData.append('LAT',this.dataStorage.LAT);
            formData.append('LONG',this.dataStorage.LONG);
            formData.append('SMOKE',this.dataStorage.SMOKE);
            formData.append('EVERSMOKE',this.dataStorage.EVERSMOKE);
            formData.append('EXSMOKE_Y',year);
            this.api.postdata('reportQuestion',formData).subscribe((res)=>{
              if(res.result == 'success'){
                this.router.navigateByUrl('tabs/form');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
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
  async ConfirmOrEdit(year) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ตรวจสอบ!',
      message: 'เพราะบันทึกจำนวนปีที่เลิกสูบไม่สัมพันธ์กับอายุปัจจุบัน',
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
            const formData = new FormData();
            formData.append('cat_id',"3");
            formData.append('MEMBER',this.dataStorage.MEMBER),
            formData.append('PERSON_NO',this.dataStorage.PERSON_NO),
            formData.append('SEX',this.dataStorage.SEX),
            formData.append('AGE',this.dataStorage.AGE),
            formData.append('CWT',this.dataStorage.CWT);
            formData.append('TMP',this.dataStorage.TMP);
            formData.append('ID1',this.dataStorage.ID1);
            formData.append('VIL',this.dataStorage.VIL);
            formData.append('MOO',this.dataStorage.MOO);
            formData.append('A1',this.dataStorage.A1);
            formData.append('NAME',this.dataStorage.NAME);
            formData.append('ADDRESS',this.dataStorage.ADDRESS);
            formData.append('LAT',this.dataStorage.LAT);
            formData.append('LONG',this.dataStorage.LONG);
            formData.append('SMOKE',this.dataStorage.SMOKE);
            formData.append('EVERSMOKE',this.dataStorage.EVERSMOKE);
            formData.append('EXSMOKE_Y',year);
            this.api.postdata('reportQuestion',formData).subscribe((res)=>{
              if(res.result == 'success'){
                this.router.navigateByUrl('tabs/form');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
