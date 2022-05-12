import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';
import { ActionSheetController,LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})
export class Form2Page implements OnInit {

  titlePub:any;
  latitude:any;
  longitude:any;
  dataStorage:any = [];
  dataStorage_step1:any = [];
  numberId:any;
  todo = {
    MOO: '',
    VIL: '',
  }
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private network: Network,
    private storage: Storage,
    public auth:AuthService,
    public actionSheetController: ActionSheetController,
    public loadingController:LoadingController,
    public toastController:ToastController,
    public alertController:AlertController
  ) {
    this.titlePub = this.auth.titlePublic();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.dataStorage_step1  = await this.storage.get('formpublic_step1');
    this.dataStorage        = await this.storage.get('formpublic_step1');
    this.numberId           = await this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    if(form.value.MOO == '' || form.value.VIL == ''){
      this.alert();
    }else{
      if(this.numberId == 'continue'){
        let dataAnswer = {
          "CWT":this.dataStorage_step1.CWT,
          "ID1":this.dataStorage_step1.ID1,
          "TMP":this.dataStorage_step1.TMP,
          "LAT":this.dataStorage_step1.LAT,
          "LONG":this.dataStorage_step1.LONG,
          "dateStart":this.dataStorage_step1.dateStart,
          "MOO":form.value.MOO,
          "VIL":form.value.VIL,
        };
        await this.storage.set('formpublic_step1',dataAnswer);
        await this.router.navigateByUrl('/formone/form3/continue');
      }else{
        this.dataStorage[this.numberId].MOO = form.value.MOO;
        this.dataStorage[this.numberId].VIL = form.value.VIL;
        await this.storage.set('formpublic',this.dataStorage);
        await this.router.navigateByUrl('/formone/form3/'+this.numberId);
      }
    }
  }
  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ตรวจสอบ !!!',
      message: 'กรุณากรอกข้อมูลให้ครบ ถ้าไม่มีข้อมูลหมู่ที่ หรือชื่อชุมชน/บ้าน ให้บันทึก "ไม่มี"',
    });

    await alert.present();
  }
  async backPage(){
    this.router.navigateByUrl('formone/'+this.numberId);
  }
}
