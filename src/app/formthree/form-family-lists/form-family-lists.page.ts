import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-family-lists',
  templateUrl: './form-family-lists.page.html',
  styleUrls: ['./form-family-lists.page.scss'],
})
export class FormFamilyListsPage implements OnInit {

  dataStorage:any = [];
  dataStorageAll:any = [];
  id:any;
  status:any;
  // member:any;
  constructor(
    private storage: Storage,
    public router:Router,
    public loadingController:LoadingController,
    public alertController:AlertController,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    // await this.storage.get('formfamily').then((data)=>{
    //   this.member     = data.MEMBER;
    // });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
    this.id     = this.route.snapshot.paramMap.get('id');
    this.status = this.route.snapshot.paramMap.get('status');
    await this.storage.get('formfamily').then((data)=>{
      this.dataStorage    = data[this.id];
      this.dataStorageAll = data; 
    });
  }
  async btnStartTest(data){
    this.router.navigateByUrl('/formthree/form4/'+data);
  }
  async btnStart(){
    if(this.status == "success"){
      let dataAnswer = {
        "CWT":this.dataStorage.CWT,
        "TMP":this.dataStorage.TMP,
        "ID1":this.dataStorage.ID1,
        "LAT":this.dataStorage.LAT,
        "LONG":this.dataStorage.LONG,
        "MOO":this.dataStorage.MOO,
        "VIL":this.dataStorage.VIL,
        "A1":this.dataStorage.A1,
        "MEMBER":this.dataStorage.MEMBER,
        "PERSON_NO":this.dataStorage.PERSON_NO + 1,
      };
      await this.dataStorageAll.push(dataAnswer);
      await this.storage.set('formfamily',this.dataStorageAll);
      this.router.navigateByUrl('/formthree/form4/'+this.id);
    }else if (this.status == "continue"){
      this.router.navigateByUrl('/formthree/form4/'+this.id);
    }
  }
}
