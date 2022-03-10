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
  }


  // action
  async formData(form){
    this.dataStorage[this.id].NAME        = form.value.NAME;
    this.dataStorage[this.id].SEX         = form.value.SEX;
    this.dataStorage[this.id].AGE         = form.value.AGE;
    this.dataStorage[this.id].PERSON_NO   = this.dataStorage[this.id].PERSON_NO == undefined ? 1 : this.dataStorage[this.id].PERSON_NO;
    await this.storage.set('formfamily',this.dataStorage);

    if(form.value.AGE == '' || form.value.NAME == '' || form.value.SEX == ''){
      this.presentToast();
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
            this.router.navigateByUrl('/formthree/form-family-lists/'+this.id+'/success');
            // const formData = new FormData();
            // formData.append('cat_id',"3");
            // formData.append('user_id',userId);
            // formData.append('MEMBER',this.dataStorage.MEMBER),
            // formData.append('PERSON_NO',this.dataStorage.PERSON_NO),
            // formData.append('CWT',this.dataStorage.CWT);
            // formData.append('TMP',this.dataStorage.TMP);
            // formData.append('ID1',this.dataStorage.ID1);
            // formData.append('VIL',this.dataStorage.VIL);
            // formData.append('MOO',this.dataStorage.MOO);
            // formData.append('A1',this.dataStorage.A1);
            // formData.append('LAT',this.dataStorage.LAT);
            // formData.append('LONG',this.dataStorage.LONG);
            // formData.append('SEX',SEX),
            // formData.append('AGE',AGE),
            // formData.append('NAME',NAME),
            // this.api.postdata('reportQuestion',formData).subscribe((res)=>{
            //   if(res.result == 'success'){
            //     if(this.dataStorage.MEMBER - this.dataStorage.PERSON_NO !== 0){
            //       this.router.navigateByUrl('/formthree/form-family-lists');
            //     }else{
            //       this.presentAlertConfirm();
            //     }
            //   }
            // });
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
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'กรุณากรอกข้อมูล',
      duration: 2000,
      color:"danger",
      position:"middle"
    });
    toast.present();
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

  todo = {
    NAME: '',
    SEX: '',
    AGE: '',
  };

}
