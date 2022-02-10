import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-step11',
  templateUrl: './form-step11.page.html',
  styleUrls: ['./form-step11.page.scss'],
})
export class FormStep11Page implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  async form(event){
    let id = event.srcElement.id;
    this.router.navigateByUrl('formthree/form-response/form-step10/form-step11/form-step12');
  }
}
