import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-report-head-lists',
  templateUrl: './report-head-lists.page.html',
  styleUrls: ['./report-head-lists.page.scss'],
})
export class ReportHeadListsPage implements OnInit {
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
