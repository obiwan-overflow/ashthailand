import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { LoadingController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-lists',
  templateUrl: './form-lists.page.html',
  styleUrls: ['./form-lists.page.scss'],
})
export class FormListsPage implements OnInit {

  id:any;
  listsData:any;
  loading:any;
  constructor(
    public api:RestApiService,
    public route:ActivatedRoute,
    public loadingController:LoadingController,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    this.loading.present();
    await this.api.getdata('reportQuestion/lists&id='+this.id).subscribe(res => {
      if(res.result == "success"){
        this.listsData = res.lists;
        this.loading.dismiss();
      }else{
        this.loading.dismiss();
      }
    },err=>{
      this.loading.dismiss();
    });
  }
}
