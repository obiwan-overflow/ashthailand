import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-step4',
  templateUrl: './form-step4.page.html',
  styleUrls: ['./form-step4.page.scss'],
})
export class FormStep4Page implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  async Form(){
    if(this.todo.year >= '1'){
     
    }else{
      this.router.navigateByUrl('formthree/form-step1/form-step4/form-step4b');
    }
  }
  todo = {
    year:""
  }
}
