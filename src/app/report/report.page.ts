import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  userData:any = [];
  constructor(
    public storage:Storage,
    public loadingController:LoadingController
  ) {

  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    await loading.present();
    this.userData = await this.storage.get('userData');
    await loading.dismiss();
  }
}
