import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-re-password',
  templateUrl: './re-password.page.html',
  styleUrls: ['./re-password.page.scss'],
})
export class RePasswordPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  todo = {
    oldpassword: '',
    password: '',
    confirmpassword: ''
  };
  async formRepassword(form) {
    console.log(form.value)
  }
}
