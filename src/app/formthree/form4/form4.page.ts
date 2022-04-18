import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.page.html',
  styleUrls: ['./form4.page.scss'],
})
export class Form4Page implements OnInit {
  dataStorage:any = [];
  id:any;
  todo = {
    NAME: '',
    SEX: '',
    AGE: '',
  };
  IdMOO:any;
  IdVIL:any;
  IdA1:any;
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private storage: Storage,
    public loadingController:LoadingController,
    public toastController:ToastController,
    public alertController:AlertController
  ) {

  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('formfamily').then((data)=>{
      this.dataStorage = data;
      // this.dataStorage[this.id].PERSON_NO  = data[this.id].PERSON_NO == undefined ? 1 : (data[this.id].PERSON_NO + 1);
    });
    
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
    this.id = this.route.snapshot.paramMap.get('id');
    this.IdMOO = this.dataStorage[this.id].MOO.replace("/","*kk*");
    this.IdVIL = this.dataStorage[this.id].VIL.replace("/","*kk*");
    this.IdA1  = this.dataStorage[this.id].A1.replace("/","*kk*");
  }


  // action
  async formData(form){
    let userData = await this.storage.get('userData');

    this.dataStorage[this.id].NAME                = form.value.NAME;
    this.dataStorage[this.id].SEX                 = form.value.SEX;
    this.dataStorage[this.id].AGE                 = form.value.AGE;
    this.dataStorage[this.id].organization_name   = userData.organization_name;
    this.dataStorage[this.id].PERSON_NO           = this.dataStorage[this.id].PERSON_NO == undefined ? 1 : this.dataStorage[this.id].PERSON_NO;
    await this.storage.set('formfamily',this.dataStorage);

    if(form.value.AGE == '' || form.value.NAME == '' || form.value.SEX == ''){
      this.alert();
    }else if (form.value.AGE >= 15){
      this.router.navigateByUrl('/formthree/form-step1/'+this.id);
    }else if(form.value.AGE <= 14){
      this.formConfirm(form.value.NAME,form.value.SEX,form.value.AGE);
    }
  }
  async formConfirm(NAME,SEX,AGE){
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
            console.log('Confirm Okay');
            this.dataStorage[this.id].status   = "success";
            this.storage.set('formfamily',this.dataStorage);
            this.router.navigateByUrl('/formthree/form-family-lists/'+this.IdMOO+'/'+this.IdVIL+'/'+this.IdA1+'/success');
          }
        }
      ]
    });
    await alert.present();
  }


  // alert
  async alertAgelimit(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'เงื่อนไข!',
      message: 'อายุเกินกำหนด',
      keyboardClose:true
    });
    await alert.present();
  }
  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ตรวจสอบ',
      message: 'กรุณากรอกข้อมูล !!!',
    });

    await alert.present();
  }
  async presentAlertConfirm() {
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

  async backPage(){
    this.router.navigateByUrl('formthree/form-family-lists/'+this.IdMOO+'/'+this.IdVIL+'/'+this.IdA1+'/success');
  }
}
