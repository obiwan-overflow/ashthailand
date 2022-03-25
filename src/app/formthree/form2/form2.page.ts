import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})
export class Form2Page implements OnInit {
  dataStorage:any = [];
  index:any;
  todo = {
    MOO: '',
    VIL: '',
    A1: '',
  };
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
      this.index = data.length-1;
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    let MOO = form.value.MOO;
    let VIL = form.value.VIL;
    let A1  = form.value.A1;
   
    if(MOO == '' || VIL == '' || A1 == ''){
      this.alert();
    }else{
      this.dataStorage[this.index].MOO = MOO;
      this.dataStorage[this.index].VIL = VIL;
      this.dataStorage[this.index].A1  = A1;
      await this.storage.set('formfamily',this.dataStorage);
      this.router.navigateByUrl('/formthree/form3');
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
}
