import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-report-head',
  templateUrl: './report-head.page.html',
  styleUrls: ['./report-head.page.scss'],
})
export class ReportHeadPage implements OnInit {
  fullname:any;
  constructor(public api:RestApiService,public storage:Storage) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('fullname').then((data)=>{
      this.fullname = data;
    });
  }
}
