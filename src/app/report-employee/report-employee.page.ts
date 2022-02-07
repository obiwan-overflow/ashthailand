import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-report-employee',
  templateUrl: './report-employee.page.html',
  styleUrls: ['./report-employee.page.scss'],
})
export class ReportEmployeePage implements OnInit {

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
