import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-formone-detail',
  templateUrl: './formone-detail.page.html',
  styleUrls: ['./formone-detail.page.scss'],
})
export class FormoneDetailPage implements OnInit {

  id:any;
  P1A:any;
  P2A:any;
  P3A:any;
  P4A:any;
  P5A:any;
  constructor(public api:RestApiService,public route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('reportQuestion/detail&id='+this.id).subscribe(res => {
      this.P1A = res.detail.P1A;
      this.P2A = res.detail.P2A;
      this.P3A = res.detail.P3A;
      this.P4A = res.detail.P4A;
      this.P5A = res.detail.P5A;
    });
  }

  ngOnInit() {
  }

}
