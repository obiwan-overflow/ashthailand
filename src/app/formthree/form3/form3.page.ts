import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,ToastController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.page.html',
  styleUrls: ['./form3.page.scss'],
})
export class Form3Page implements OnInit {

  province:any;
  district:any;
  subdistrict:any;
  latitude:any;
  longitude:any;
  dataStorage:any = [];
  memberCount:any;
  dataAnswer:any = [];
  private todo : FormGroup;
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private storage: Storage,
    public loadingController:LoadingController,
    public toastController:ToastController,
    private formBuilder: FormBuilder
  ) {
    this.todo = this.formBuilder.group({
      MEMBER: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.dataStorage = await this.storage.get('formfamily');
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(){
    console.log(this.todo.value.MEMBER);
    if(this.todo.value.MEMBER == ''){
      this.presentToast();
    }else{
      // for(let i = 1; i < this.todo.value.MEMBER; i++){
      //   let dataAnswer = [{
      //     "CWT":this.dataStorage.CWT,
      //     "TMP":this.dataStorage.TMP,
      //     "ID1":this.dataStorage.ID1,
      //     "LAT":this.dataStorage.LAT,
      //     "LONG":this.dataStorage.LONG,
      //     "MOO":this.dataStorage.MOO,
      //     "VIL":this.dataStorage.VIL,
      //     "A1":this.dataStorage.A1,
      //     "MEMBER":this.todo.value.MEMBER,
      //   }];
      //   await this.storage.set('formfamily',dataAnswer);
      // }
      let dataAnswer = {
        "CWT":this.dataStorage.CWT,
        "TMP":this.dataStorage.TMP,
        "ID1":this.dataStorage.ID1,
        "LAT":this.dataStorage.LAT,
        "LONG":this.dataStorage.LONG,
        "MOO":this.dataStorage.MOO,
        "VIL":this.dataStorage.VIL,
        "A1":this.dataStorage.A1,
        "MEMBER":this.todo.value.MEMBER,
      };
      await this.storage.set('formfamily',dataAnswer);
      this.router.navigateByUrl('/formthree/form4');
    }
  }
  async btnStartTest(){
    this.router.navigateByUrl('/formthree/form4');
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'กรุณากรอกข้อมูล',
      duration: 2000,
      color:"danger",
      position:"middle",
    });
    toast.present();
  }
}
