import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { LoadingController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  lists:any;
  constructor(
    public api:RestApiService,
    public loadingController:LoadingController
  ) {
    this.api.getdata('news').subscribe(res=>{
      this.lists = res;
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    await loading.present();
    await loading.dismiss();
  }
}
