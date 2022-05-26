import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-step12',
  templateUrl: './form-step12.page.html',
  styleUrls: ['./form-step12.page.scss'],
})
export class FormStep12Page implements OnInit {

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
  ) {

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
  async form(event){
    let answerVal = event.srcElement.id;
    this.dataStorage[this.id].QUITE_CHECK = await answerVal;
    
    await this.storage.set('formfamily',this.dataStorage);
    await this.formConfirm();
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
            let date = new Date();
            var pad = function(num) { return ('00'+num).slice(-2) };
            let dateDay = date.getUTCFullYear()+"-"+pad(date.getUTCMonth() + 1)+"-"+pad(date.getUTCDate())+" "+pad(date.getHours())+":"+pad(date.getMinutes())+":"+pad(date.getSeconds());

            this.dataStorage[this.id].status        = "success";
            this.dataStorage[this.id].dateSuccess   = dateDay;
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
    this.router.navigateByUrl('/formthree/form-step11/'+this.id);
  }
}
