import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-step4b',
  templateUrl: './form-step4b.page.html',
  styleUrls: ['./form-step4b.page.scss'],
})
export class FormStep4bPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  async Form(){
    this.router.navigateByUrl('formthree/form-step1/form-step4/form-step4b/form-smoketype');
  }
  todo = {
    month:""
  }
}
