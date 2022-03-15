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
  dataFamily:any = [];
  index:any;
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
    await this.storage.get('formfamily').then((data)=>{
      this.dataStorage  = data;
      this.index        = data.length-1;
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }


  // load data
  async formData(){
    if(this.todo.value.MEMBER == ''){
      this.presentToast();
    }else{
      
      this.dataStorage[this.index].MEMBER = this.todo.value.MEMBER;
      await this.storage.set('formfamily',this.dataStorage);
      let MOO = this.dataStorage[this.index].MOO.replace("/","*kk*");
      let VIL = this.dataStorage[this.index].VIL.replace("/","*kk*");
      let A1  = this.dataStorage[this.index].A1.replace("/","*kk*");
      this.router.navigateByUrl('/formthree/form-family-lists/'+MOO+'/'+VIL+'/'+A1+'/continue');
      // this.router.navigateByUrl('/formthree/form-family-lists/'+this.index+'/continue');

      // var subArray = [];
      // for(let i = 1; i <= this.todo.value.MEMBER; i++){
      //   var dataAnswer = {
      //     "CWT":this.dataStorage.CWT,
      //     "TMP":this.dataStorage.TMP,
      //     "ID1":this.dataStorage.ID1,
      //     "LAT":this.dataStorage.LAT,
      //     "LONG":this.dataStorage.LONG,
      //     "MOO":this.dataStorage.MOO,
      //     "VIL":this.dataStorage.VIL,
      //     "A1":this.dataStorage.A1,
      //     "MEMBER":this.todo.value.MEMBER,
      //   };
      //   subArray.push(dataAnswer);
      // }
      // await this.storage.set('formfamily',subArray);
      // await this.router.navigateByUrl('/formthree/form-family-lists');
      // this.loadDataMember();

      
      // let dataAnswer = {
      //   "CWT":this.dataStorage.CWT,
      //   "TMP":this.dataStorage.TMP,
      //   "ID1":this.dataStorage.ID1,
      //   "LAT":this.dataStorage.LAT,
      //   "LONG":this.dataStorage.LONG,
      //   "MOO":this.dataStorage.MOO,
      //   "VIL":this.dataStorage.VIL,
      //   "A1":this.dataStorage.A1,
      //   "MEMBER":this.todo.value.MEMBER,
      // };
      // await this.storage.set('formfamily',dataAnswer);
      // this.router.navigateByUrl('/formthree/form4');
    }
  }
  async loadDataMember(){
    this.dataFamily = await this.storage.get('formfamily');
  }


  // action
  async btnStartTest(data){
    this.router.navigateByUrl('/formthree/form4/'+data);
  }



  // alert 
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'กรุณากรอกข้อมูล',
      duration: 2000,
      color:"danger",
      position:"middle",
      cssClass: "customToast"
    });
    toast.present();
  }
}
