import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { LoadingController,AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

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
    public storage:Storage
  ) {
    
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    this.loading.present();
    let userID = await this.storage.get('userData');
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('reportQuestion/lists&id='+this.id+'&user_id='+userID.id).subscribe(res => {
      if(res.result == "success"){
        for (let index = 0; index < res.lists.length; index++) {
          this.listsData              = res.lists;
          this.listsData[index].YEAR  = parseInt(res.lists[index].YEAR)+parseInt('543'); 
          if(res.lists[index].MONTH == '01'){
            this.listsData[index].MONTH = "มกราคม";
          }else if(res.lists[index].MONTH == '02'){
            this.listsData[index].MONTH = "กุมภาพันธ์";
          }else if(res.lists[index].MONTH == '03'){
            this.listsData[index].MONTH = "มีนาคม";
          }else if(res.lists[index].MONTH == '04'){
            this.listsData[index].MONTH = "เมษายน";
          }else if(res.lists[index].MONTH == '05'){
            this.listsData[index].MONTH = "พฤษภาคม";
          }else if(res.lists[index].MONTH == '06'){
            this.listsData[index].MONTH = "มิถุนายน";
          }else if(res.lists[index].MONTH == '07'){
            this.listsData[index].MONTH = "กรกฎาคม";
          }else if(res.lists[index].MONTH == '08'){
            this.listsData[index].MONTH = "สิงหาคม";
          }else if(res.lists[index].MONTH == '09'){
            this.listsData[index].MONTH = "กันยายน";
          }else if(res.lists[index].MONTH == '10'){
            this.listsData[index].MONTH = "ตุลาคม";
          }else if(res.lists[index].MONTH == '11'){
            this.listsData[index].MONTH = "พฤศจิกายน";
          }else if(res.lists[index].MONTH == '12'){
            this.listsData[index].MONTH = "ธันวาคม";
          }
        }
        this.loading.dismiss();
      }else{
        this.loading.dismiss();
      }
    },err=>{
      this.loading.dismiss();
    });
  }
}
