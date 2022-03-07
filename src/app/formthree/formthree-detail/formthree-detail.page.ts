import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-formthree-detail',
  templateUrl: './formthree-detail.page.html',
  styleUrls: ['./formthree-detail.page.scss'],
})
export class FormthreeDetailPage implements OnInit {
  
  id:any;
  SMOKE:any;      
  EVERSMOKE:any;  
  EXSMOKE_Y:any;  
  EXSMOKE_M:any;  
  TIME_Y:any;     
  TIME_M:any;     
  CIG:any;        
  ROLL:any;       
  E_CIG:any;
  OTHER:any;      
  NO1:any;        
  RESPONSE:any;   
  TYPE_CIG:any;   
  SECOND:any;     
  QUITE_CHECK:any;
  constructor(public api:RestApiService,public route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('reportQuestion/detail&id='+this.id).subscribe(res => {
      this.SMOKE        = res.detail.SMOKE;
      this.EVERSMOKE    = res.detail.EVERSMOKE;
      this.EXSMOKE_Y    = res.detail.EXSMOKE_Y;
      this.EXSMOKE_M    = res.detail.EXSMOKE_M;
      this.TIME_Y       = res.detail.TIME_Y;
      this.TIME_M       = res.detail.TIME_M;
      this.CIG          = res.detail.CIG;
      this.ROLL         = res.detail.ROLL;
      this.E_CIG        = res.detail.E_CIG;
      this.OTHER        = res.detail.OTHER;
      this.NO1          = res.detail.NO1;
      this.RESPONSE     = res.detail.RESPONSE;
      this.TYPE_CIG     = res.detail.TYPE_CIG;
      this.SECOND       = res.detail.SECOND;
      this.QUITE_CHECK  = res.detail.QUITE_CHECK;
    });
  }

  ngOnInit() {
  }

}
