import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-step10',
  templateUrl: './form-step10.page.html',
  styleUrls: ['./form-step10.page.scss'],
})
export class FormStep10Page implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  async form(event){
    let id = event.srcElement.id;
    this.router.navigateByUrl('formthree/form-response/form-step10/form-step11');
  }
}
