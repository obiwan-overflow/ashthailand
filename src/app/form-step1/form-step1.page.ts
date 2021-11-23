import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-step1',
  templateUrl: './form-step1.page.html',
  styleUrls: ['./form-step1.page.scss'],
})
export class FormStep1Page implements OnInit {

  constructor(public route:Router) { }

  ngOnInit() {
  }
  async form(){
    this.route.navigateByUrl('form-step2');
  }
}
