import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-step2',
  templateUrl: './form-step2.page.html',
  styleUrls: ['./form-step2.page.scss'],
})
export class FormStep2Page implements OnInit {
  dataStorage:any = [];
  id:any;
  IdMOO:any;
  IdVIL:any;
  IdA1:any;
  constructor(
    public storage:Storage,
    public api:RestApiService,
    public router:Router,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.id = await this.route.snapshot.paramMap.get('id');
    await this.storage.get('formfamily').then((data)=>{
      this.dataStorage = data;
    });
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
  async form(event){
    let answerVal = event.srcElement.id;
    this.dataStorage[this.id].EVERSMOKE = answerVal;
    
    await this.storage.set('formfamily',this.dataStorage);
    if(answerVal == "1"){
      this.formConfirm();
    }else{
      await this.router.navigateByUrl('formthree/form-step3/'+this.id);
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
            console.log('Confirm Okay');
            this.dataStorage[this.id].status    = "success";
            this.dataStorage[this.id].date      = Date();
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
    this.router.navigateByUrl('/formthree/form-step1/'+this.id);
  }
}
