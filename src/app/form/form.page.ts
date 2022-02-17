import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  titlePub:any;
  titleShop:any;
  constructor(public api:RestApiService,public auth:AuthService) {
    this.titlePub = this.auth.titlePublic();
    this.titleShop = this.auth.titleShop();
  }

  ngOnInit() {
  }

}
