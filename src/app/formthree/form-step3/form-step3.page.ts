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
          this.formConfirm(year);
        }
      }else{
        this.ConfirmOrEdit(year);
      }
    }else if (year == 88){
      this.router.navigateByUrl('formthree/form-step3b/'+this.id);
    }else{
      this.presentAlertConfirm();
    }
  }
  async formConfirm(year){
    const userId = await this.storage.get('userId');
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
            this.dataStorage[this.id].status   = "success";
            this.storage.set('formfamily',this.dataStorage);
            this.router.navigateByUrl('/formthree/form-family-lists/'+this.id+'/success');
            // const formData = new FormData();
            // formData.append('cat_id',"3");
            // formData.append('user_id',userId);
            // formData.append('MEMBER',this.dataStorage.MEMBER),
            // formData.append('PERSON_NO',this.dataStorage.PERSON_NO),
            // formData.append('SEX',this.dataStorage.SEX),
            // formData.append('AGE',this.dataStorage.AGE),
            // formData.append('CWT',this.dataStorage.CWT);
            // formData.append('TMP',this.dataStorage.TMP);
            // formData.append('ID1',this.dataStorage.ID1);
            // formData.append('VIL',this.dataStorage.VIL);
            // formData.append('MOO',this.dataStorage.MOO);
            // formData.append('A1',this.dataStorage.A1);
            // formData.append('NAME',this.dataStorage.NAME);
            // formData.append('ADDRESS',this.dataStorage.ADDRESS);
            // formData.append('LAT',this.dataStorage.LAT);
            // formData.append('LONG',this.dataStorage.LONG);
            // formData.append('SMOKE',this.dataStorage.SMOKE);
            // formData.append('EVERSMOKE',this.dataStorage.EVERSMOKE);
            // formData.append('EXSMOKE_Y',year);
            // this.api.postdata('reportQuestion',formData).subscribe((res)=>{
            //   if(res.result == 'success'){
            //     if(this.dataStorage.MEMBER - this.dataStorage.PERSON_NO !== 0){
            //       this.router.navigateByUrl('/formthree/form-family-lists');
            //     }else{
            //       this.memberSuccess();
            //     }
            //   }
            // });
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
    const userId = await this.storage.get('userId');
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
            this.router.navigateByUrl('/formthree/form-family-lists/'+this.id+'/success');
            // const formData = new FormData();
            // formData.append('cat_id',"3");
            // formData.append('user_id',userId);
            // formData.append('MEMBER',this.dataStorage.MEMBER),
            // formData.append('PERSON_NO',this.dataStorage.PERSON_NO),
            // formData.append('SEX',this.dataStorage.SEX),
            // formData.append('AGE',this.dataStorage.AGE),
            // formData.append('CWT',this.dataStorage.CWT);
            // formData.append('TMP',this.dataStorage.TMP);
            // formData.append('ID1',this.dataStorage.ID1);
            // formData.append('VIL',this.dataStorage.VIL);
            // formData.append('MOO',this.dataStorage.MOO);
            // formData.append('A1',this.dataStorage.A1);
            // formData.append('NAME',this.dataStorage.NAME);
            // formData.append('ADDRESS',this.dataStorage.ADDRESS);
            // formData.append('LAT',this.dataStorage.LAT);
            // formData.append('LONG',this.dataStorage.LONG);
            // formData.append('SMOKE',this.dataStorage.SMOKE);
            // formData.append('EVERSMOKE',this.dataStorage.EVERSMOKE);
            // formData.append('EXSMOKE_Y',year);
            // this.api.postdata('reportQuestion',formData).subscribe((res)=>{
            //   if(res.result == 'success'){
            //     if(this.dataStorage.MEMBER - this.dataStorage.PERSON_NO !== 0){
            //       this.router.navigateByUrl('/formthree/form-family-lists');
            //     }else{
            //       this.memberSuccess();
            //     }
            //   }
            // });
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
}
