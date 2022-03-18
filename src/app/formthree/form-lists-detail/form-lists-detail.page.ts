import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-form-lists-detail',
  templateUrl: './form-lists-detail.page.html',
  styleUrls: ['./form-lists-detail.page.scss'],
})
export class FormListsDetailPage implements OnInit {
  listsData:any;
  constructor(public api:RestApiService,public route:ActivatedRoute,public storage:Storage) {
    
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    let VIL     = await this.route.snapshot.paramMap.get('VIL');
    let MOO     = await this.route.snapshot.paramMap.get('MOO');
    let A1      = await this.route.snapshot.paramMap.get('A1');
    let userID  = await this.storage.get('userData');
    this.api.getdata('reportQuestion/familyLists&vil='+VIL+'&moo='+MOO+'&a1='+A1+'&user_id='+userID.id).subscribe(res => {
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
    });
  }
}
