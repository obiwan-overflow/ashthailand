import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})
export class Form2Page implements OnInit {
  dataStorage:any = [];
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private storage: Storage,
    public loadingController:LoadingController,
    public toastController:ToastController
  ) {
    
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('formfamily').then((data)=>{
      this.dataStorage = data;
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    // let dataAnswer = {
    //   "MENBER":form.value.MENBER,
    //   "PERSON_NO":form.value.PERSON_NO,
    //   "SEX":form.value.SEX,
    //   "AGE":form.value.AGE,
    //   "CWT":form.value.CWT,
    //   "TMP":form.value.TMP,
    //   "ID1":form.value.ID1,
    //   "VIL":form.value.VIL,
    //   "MOO":form.value.MOO,
    //   "A1":form.value.A1,
    //   "NAME":form.value.NAME,
    //   "ADDRESS":form.value.ADDRESS,
    //   "LAT":this.latitude,
    //   "LONG":this.longitude
    // }
    if(form.value.MOO == '' || form.value.VIL == '' || form.value.A1 == ''){
      this.presentToast();
    }else{
      // let dataAnswer = {
      //   "CWT":this.dataStorage.CWT,
      //   "TMP":this.dataStorage.TMP,
      //   "ID1":this.dataStorage.ID1,
      //   "LAT":this.dataStorage.LAT,
      //   "LONG":this.dataStorage.LONG,
      //   "MOO":form.value.MOO,
      //   "VIL":form.value.VIL,
      //   "A1":form.value.A1,
      // }
      this.dataStorage[0].MOO = form.value.MOO;
      this.dataStorage[0].VIL = form.value.VIL;
      this.dataStorage[0].A1  = form.value.A1;
      await this.storage.set('formfamily',this.dataStorage);
      this.router.navigateByUrl('/formthree/form3');
    }
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
  todo = {
    MOO: '',
    VIL: '',
    A1: '',
  };

}
