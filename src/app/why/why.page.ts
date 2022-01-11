import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-why',
  templateUrl: './why.page.html',
  styleUrls: ['./why.page.scss'],
})
export class WhyPage implements OnInit {
  detail:any;
  constructor(public api:RestApiService) {
    this.api.getdata('article').subscribe((res)=>{
      this.detail = res.text;
    });
  }

  ngOnInit() {
  }

}
