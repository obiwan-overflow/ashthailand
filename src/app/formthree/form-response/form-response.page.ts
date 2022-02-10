import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-response',
  templateUrl: './form-response.page.html',
  styleUrls: ['./form-response.page.scss'],
})
export class FormResponsePage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  async form(event){
    let id = event.srcElement.id;
    if(id == "ใช่"){
      this.router.navigateByUrl('formthree/form-response/form-step10');
    }else{

    }
  }
}
