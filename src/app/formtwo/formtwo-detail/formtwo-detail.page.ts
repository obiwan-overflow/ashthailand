import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-formtwo-detail',
  templateUrl: './formtwo-detail.page.html',
  styleUrls: ['./formtwo-detail.page.scss'],
})
export class FormtwoDetailPage implements OnInit {

  id:any;
  S1A:any;
  S2A:any;
  S3A:any;
  S4A:any;
  S5A:any;
  S6A:any;
  constructor(public api:RestApiService,public route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('reportQuestion/detail&id='+this.id).subscribe(res => {
      this.S1A = res.detail.S1A;
      this.S2A = res.detail.S2A;
      this.S3A = res.detail.S3A;
      this.S4A = res.detail.S4A;
      this.S5A = res.detail.S5A;
      this.S6A = res.detail.S6A;
    });
  }

  ngOnInit() {
  }

}
