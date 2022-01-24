import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-form-complete',
  templateUrl: './form-complete.page.html',
  styleUrls: ['./form-complete.page.scss'],
})
export class FormCompletePage implements OnInit {
  id:any;
  data:any;
  constructor(public api:RestApiService,public route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id-detail');
    this.api.getdata('reportQuestion/detail&id='+this.id).subscribe(res => {
      this.data = res.detail;
      console.log(res);
    });
  }

  ngOnInit() {
  }

}
