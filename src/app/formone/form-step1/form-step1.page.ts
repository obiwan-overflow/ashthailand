import { Component, OnInit } from '@angular/core';
import { attribute } from 'node_modules_bak/postcss-selector-parser/postcss-selector-parser';

@Component({
  selector: 'app-form-step1',
  templateUrl: './form-step1.page.html',
  styleUrls: ['./form-step1.page.scss'],
})
export class FormStep1Page implements OnInit {

  constructor() {}

  ngOnInit() {
  }
  async form(event){
    console.log(event.srcElement.id);
  }
}