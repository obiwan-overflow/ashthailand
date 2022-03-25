import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  userData:any = [];
  constructor(public storage:Storage) {

  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.userData = await this.storage.get('userData');
  }
}
