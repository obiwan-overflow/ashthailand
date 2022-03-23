import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';
import { LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.page.html',
  styleUrls: ['./form3.page.scss'],
})
export class Form3Page implements OnInit {
  dataStorage: any = [];
  dataStorage_step1:any = [];
  numberId:any;
  titleShop:any;
  todo = {
    A1: '',
  }
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private network: Network,
    private storage: Storage,
    public auth:AuthService,
    public loadingController:LoadingController,
    public toastController:ToastController,
    public alertController:AlertController
  ) {
    this.titleShop = this.auth.titleShop();
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
    this.dataStorage_step1  = await this.storage.get('formshop_step1');
    this.dataStorage        = await this.storage.get('formshop');
    this.numberId           = await this.route.snapshot.paramMap.get('id');
  }
  async formData(form){
    if(form.value.A1 == ''){
      this.alert();
    }else{
      if(this.numberId == 'continue'){
        let dataAnswer = {
          "CWT":this.dataStorage_step1.CWT,
          "ID1":this.dataStorage_step1.ID1,
          "TMP":this.dataStorage_step1.TMP,
          "LAT":this.dataStorage_step1.LAT,
          "LONG":this.dataStorage_step1.LONG,
          "MOO":this.dataStorage_step1.MOO,
          "VIL":this.dataStorage_step1.VIL,
          "A1":form.value.A1,
        }
        await this.storage.set('formshop_step1',dataAnswer);
        await this.router.navigateByUrl('/formtwo/form4/continue');
      }else{
        this.dataStorage[this.numberId].A1 = form.value.A1;

        await this.storage.set('formshop',this.dataStorage);
        await this.router.navigateByUrl('/formtwo/form4/'+this.numberId);
      }
    }
  }
  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ตรวจสอบ',
      message: 'กรุณากรอกข้อมูล !!!',
    });

    await alert.present();
  }
  async backPage(){
    this.router.navigateByUrl('formtwo/form2/'+this.numberId);
  }
}
