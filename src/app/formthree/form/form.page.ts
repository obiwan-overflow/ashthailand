import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  province:any;
  district:any;
  subdistrict:any;
  latitude:any;
  longitude:any;
  detailProvince:any = [];

  loading:any;
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private geolocation: Geolocation,
    private storage: Storage,
    public loadingController:LoadingController
  ) {
    this.storage.get('userData').then((data)=>{
      this.province     = data.province;
      this.district     = data.district;
      this.subdistrict  = data.subdistrict;
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    this.loading.present();
    this.loadData();
  }
  async loadData(){
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude   = resp.coords.latitude;
      this.longitude  = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    await this.api.getdata('member/getProvincesList&id_province='+this.province+'&id_amphures='+this.district+'&id_tombons='+this.subdistrict).subscribe((res)=>{
      this.detailProvince = res.detail;
    });
    await this.loading.dismiss();
  }
  async formData(form){
    let dataAnswer = {
      member:'',
      family: [{
        "CWT":this.province,
        "TMP":this.district,
        "ID1":this.subdistrict,
        "LAT":this.latitude,
        "LONG":this.longitude,
      }]
    }
    await this.storage.set('formfamily',dataAnswer);
    this.router.navigateByUrl('/formthree/form2');
  }
  todo = {
    CWT: '',
    TMP: '',
    ID1: '',
  };
}
