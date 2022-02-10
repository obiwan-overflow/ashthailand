import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-smoketype',
  templateUrl: './form-smoketype.page.html',
  styleUrls: ['./form-smoketype.page.scss'],
})
export class FormSmoketypePage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  async form(event){
    let id = event.srcElement.id;
    if(id == "บุหรี่โรงงาน" || id == "บุหรี่มวนเอง"){
      await this.router.navigateByUrl('formthree/form-step1/form-step4/form-step4b/form-smoketype/form-step9');
    }else{
      await this.router.navigateByUrl('formthree/form-step1/form-step4/form-step4b/form-smoketype/form-response');
    }
  }
}
