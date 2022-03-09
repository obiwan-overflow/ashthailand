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
    this.storage.get('userData').then((data)=>{
      this.userData = data;
    });
  }

  ngOnInit() {
  }

}
