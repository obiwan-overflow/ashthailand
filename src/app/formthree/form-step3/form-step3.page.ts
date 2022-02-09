import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-step3',
  templateUrl: './form-step3.page.html',
  styleUrls: ['./form-step3.page.scss'],
})
export class FormStep3Page implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  async Form(){
    let year = this.todo.YEAR;
    if(year <= '1'){
      this.router.navigateByUrl('formthree/form-step1/form-step2/form-step3/form-step3b');
    }else{

    }
  }
  todo = {
    YEAR:""
  }
}
