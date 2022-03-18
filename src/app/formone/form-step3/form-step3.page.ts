import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/AuthService';

@Component({
  selector: 'app-form-step3',
  templateUrl: './form-step3.page.html',
  styleUrls: ['./form-step3.page.scss'],
})
export class FormStep3Page implements OnInit {
  dataStorage:any = [];
  titlePub:any;
  numberId:any;
  constructor(
    public router:Router,
    public storage:Storage,
    public loadingController:LoadingController,
    public auth:AuthService,
    public toastController:ToastController,
    public alertController:AlertController,
    public route:ActivatedRoute
  ) {
    this.titlePub = this.auth.titlePublic();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();

    this.dataStorage = await this.storage.get('formpublic');
    this.numberId    = await this.route.snapshot.paramMap.get('id');
  }
  async form(event){
    let value = event.srcElement.id;

    this.dataStorage[this.numberId].P3A = value;

    await this.storage.set('formpublic',this.dataStorage);

    if(this.dataStorage[this.numberId].P2A == "2"){
      if(value == "2"){
        this.presentAlertConfirm();
      }else{
        await this.router.navigateByUrl('formone/form-step4/'+this.numberId);
      }
    }else{      
      await this.router.navigateByUrl('formone/form-step4/'+this.numberId);
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ตรวจสอบ',
      message: 'เพราะไม่พบป้ายห้ามสูบทั้งภายในและภายนอกอาคาร !!!',
      backdropDismiss:false,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.router.navigateByUrl('formone/form-step1/'+this.numberId);
          }
        }
      ]
    });

    await alert.present();
  }

  async backPage(){
    this.router.navigateByUrl('formone/form-step2/'+this.numberId);
  }
}
