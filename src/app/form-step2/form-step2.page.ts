import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-form-step2',
  templateUrl: './form-step2.page.html',
  styleUrls: ['./form-step2.page.scss'],
})
export class FormStep2Page implements OnInit {

  constructor(public route:Router) { }

  ngOnInit() {
  }
  async form(){
    this.route.navigateByUrl('form-success');
  }

}
