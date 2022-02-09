import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-step3b',
  templateUrl: './form-step3b.page.html',
  styleUrls: ['./form-step3b.page.scss'],
})
export class FormStep3bPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  async Form(){
    console.log(this.todo);
  }
  todo = {
    month:""
  }
}
