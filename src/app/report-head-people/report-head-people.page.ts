import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-report-head-people',
  templateUrl: './report-head-people.page.html',
  styleUrls: ['./report-head-people.page.scss'],
})
export class ReportHeadPeoplePage implements OnInit {
  user:any = {};
  constructor(
    public api:RestApiService,
    public storage:Storage
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('userData').then((data)=>{
      this.user = data;
    });
  }
}
