import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name:any;
  lastname:any;
  organization_name:any;
  province:any;
  district:any;
  subdistrict:any;
  constructor(public api:RestApiService,public storage:Storage) {
    this.init();
  }

  ngOnInit() {
  }
  async init(){
    await this.storage.get('userData').then((data)=>{
      this.name               = data.name;
      this.lastname           = data.lastname;
      this.organization_name  = data.organization_name;
      this.province           = data.province;
      this.district           = data.district;
      this.subdistrict        = data.subdistrict;
    });
  }
  todo = {
    name:'',
    lastname:'',
    phone:'',
    organization_name:'',
    province:'',
    district:'',
    subdistrict:'',
  }
}
