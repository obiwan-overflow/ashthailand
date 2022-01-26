import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-form-general',
  templateUrl: './form-general.page.html',
  styleUrls: ['./form-general.page.scss'],
})
export class FormGeneralPage implements OnInit {
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
