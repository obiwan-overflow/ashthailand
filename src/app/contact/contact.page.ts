import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  detail:any;
  constructor(public api:RestApiService) {
    this.api.getdata('home/contact').subscribe((res)=>{
      this.detail = res.text;
    });
  }

  ngOnInit() {
  }

}
