import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-announce-detail',
  templateUrl: './announce-detail.page.html',
  styleUrls: ['./announce-detail.page.scss'],
})
export class AnnounceDetailPage implements OnInit {

  detail:any;
  constructor(public api:RestApiService) {
    this.api.getdata('home/noti').subscribe((res)=>{
      this.detail = res.text;
    });
  }

  ngOnInit() {
  }

}
