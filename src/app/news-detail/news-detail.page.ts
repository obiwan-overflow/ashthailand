import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  id:any;
  title:any;
  detail:any;
  constructor(public api:RestApiService,public route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('news/detail&id='+this.id).subscribe((res)=>{
      this.title   = res.title;
      this.detail  = res.text;
    });
  }

  ngOnInit() {
  }

}
