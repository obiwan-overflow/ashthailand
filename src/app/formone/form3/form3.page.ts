import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/AuthService';
import { ActionSheetController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.page.html',
  styleUrls: ['./form3.page.scss'],
})
export class Form3Page implements OnInit {

  titlePub:any;
  todo : any = [];
  latitude:any;
  longitude:any;
  dataStorage:any = [];
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private network: Network,
    private storage: Storage,
    public auth:AuthService,
    public actionSheetController: ActionSheetController,
    public loadingController:LoadingController
  ) {
    this.titlePub = this.auth.titlePublic();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('public').then((data)=>{
      this.dataStorage.CWT      = data.CWT;
      this.dataStorage.ID1      = data.ID1;
      this.dataStorage.TMP      = data.TMP;
      this.dataStorage.LAT      = data.LAT;
      this.dataStorage.LONG     = data.LONG;
      this.dataStorage.MOO      = data.MOO;
      this.dataStorage.VIL      = data.VIL;
    });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    let dataAnswer = {
      "CWT":this.dataStorage.CWT,
      "ID1":this.dataStorage.ID1,
      "TMP":this.dataStorage.TMP,
      "LAT":this.dataStorage.LAT,
      "LONG":this.dataStorage.LONG,
      "MOO":this.dataStorage.MOO,
      "VIL":this.dataStorage.VIL,
      "A1":form.value.A1,
    }
    await this.storage.set('public',dataAnswer);
    await this.router.navigateByUrl('/formone/form4');
  }
}