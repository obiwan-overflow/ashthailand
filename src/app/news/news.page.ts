import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  lists:any;
  constructor(public api:RestApiService) {
    this.api.getdata('news').subscribe(res=>{
      this.lists = res;
    });
  }

  ngOnInit() {
  }

}
