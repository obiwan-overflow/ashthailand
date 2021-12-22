import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';


@Component({
  selector: 'app-form-step1',
  templateUrl: './form-step1.page.html',
  styleUrls: ['./form-step1.page.scss'],
})
export class FormStep1Page implements OnInit {

  id:any;
  constructor(public router:Router,public api:RestApiService,public route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
  async form(){
    this.router.navigateByUrl('/tabs/form/form-step1/form-step2/'+this.id);
  }
}
