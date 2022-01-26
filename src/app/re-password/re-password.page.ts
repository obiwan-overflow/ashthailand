import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-re-password',
  templateUrl: './re-password.page.html',
  styleUrls: ['./re-password.page.scss'],
})
export class RePasswordPage implements OnInit {
  show:any;
  userid:any;
  constructor(private storage: Storage,public api:RestApiService,public router:Router) {
    this.show = false;
  }

  ngOnInit() {
  }
  async ionViewDidEnter(){
    this.storage.get('userId').then((data)=>{
      this.userid = data;
    });
  }
  todo = {
    password: '',
    confirmpassword: ''
  };
  async formRepassword(form) {
    if(form.value.password == form.value.confirmpassword){
      const formData = new FormData();
      formData.append('id',this.userid);
      formData.append('password',form.value.confirmpassword);
      this.api.postdata('member/repassword',formData).subscribe((res)=>{
        if(res.result == 'success'){
          this.router.navigateByUrl('form-success');
        }
      });
    }else{
      this.show = true;
    }
  }
}
