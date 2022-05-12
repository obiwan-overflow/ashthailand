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
  id:any;
  IdMOO:any;
  IdVIL:any;
  IdA1:any;
  private ionicForm : FormGroup;
  constructor(
    public storage:Storage,
    public api:RestApiService,
    public router:Router,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public toastController:ToastController,
    public formBuilder: FormBuilder,
    public route:ActivatedRoute
  ) {
    this.ionicForm = this.formBuilder.group({
      YEAR: ['',[Validators.required]]
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
    this.IdMOO = this.dataStorage[this.id].MOO.replace("/","*kk*");
    this.IdVIL = this.dataStorage[this.id].VIL.replace("/","*kk*");
    this.IdA1  = this.dataStorage[this.id].A1.replace("/","*kk*");
  }
  async Form(){
    let year = this.ionicForm.value.YEAR;
    let age  = parseInt(this.dataStorage[this.id].AGE);
    this.dataStorage[this.id].EXSMOKE_Y = year;
    await this.storage.set('formfamily',this.dataStorage);

    if(year < age){
      if((age - year) > 6){
        if(year == 0){
          this.router.navigateByUrl('formthree/form-step3b/'+this.id);
        }else{
          this.formConfirm();
        }
      }else{
        this.ConfirmOrEdit();
      }
    }else if (year == 88){
      this.formConfirm();
    }else{
      this.presentAlertConfirm();
    }
  }
  async formConfirm(){
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
            this.dataStorage[this.id].status          = "success";
            this.dataStorage[this.id].dateSuccess     = Date();
            this.storage.set('formfamily',this.dataStorage);
            this.router.navigateByUrl('/formthree/form-family-lists/'+this.IdMOO+'/'+this.IdVIL+'/'+this.IdA1+'/success');
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
      message: 'เพราะบันทึกจำนวนปีที่เลิกสูบไม่สัมพันธ์กับอายุปัจจุบัน',
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
            this.dataStorage[this.id].status   = "success";
            this.storage.set('formfamily',this.dataStorage);
            this.router.navigateByUrl('/formthree/form-family-lists/'+this.IdMOO+'/'+this.IdVIL+'/'+this.IdA1+'/success');
          }
        }
      ]
    });

    await alert.present();
  }
  async memberSuccess() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'สำเร็จ!',
      message: 'เก็บข้อมูลในครัวเรือนครบแล้ว',
      backdropDismiss:false,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.router.navigateByUrl('tabs/form');
          }
        }
      ]
    });

    await alert.present();
  }
  async stop(){
    this.router.navigateByUrl('/formthree/form-family-lists/'+this.IdMOO+'/'+this.IdVIL+'/'+this.IdA1+'/success');
  }
  async backPage(){
    this.router.navigateByUrl('/formthree/form-step2/'+this.id);
  }
}
