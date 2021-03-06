import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.page.html',
  styleUrls: ['./report-admin.page.scss'],
})
export class ReportAdminPage implements OnInit {

  user:any = {};
  constructor(public api:RestApiService,public storage:Storage) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('userData').then((data)=>{
      this.user = data;
    });
  }
  
}
