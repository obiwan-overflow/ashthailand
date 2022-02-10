import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-step9',
  templateUrl: './form-step9.page.html',
  styleUrls: ['./form-step9.page.scss'],
})
export class FormStep9Page implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  async Form(){
    this.router.navigateByUrl('formthree/form-step1/form-step4/form-step4b/form-smoketype/form-step9/form-response');
  }
  todo = {
    NO:""
  }
}
