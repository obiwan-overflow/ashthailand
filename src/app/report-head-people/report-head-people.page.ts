import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-head-people',
  templateUrl: './report-head-people.page.html',
  styleUrls: ['./report-head-people.page.scss'],
})
export class ReportHeadPeoplePage implements OnInit {
  private todo : FormGroup;
  user:any = {};
  formData:boolean;
  numDay:any;
  id:any;
  dataDetail:any = [];
  constructor(
    public api:RestApiService,
    public storage:Storage,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {
    this.todo = this.formBuilder.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('userData').then((data)=>{
      this.user = data;
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }
  async logForm(){
    var dateStart           = await new Date(this.todo.value.dateStart);
    var dateEnd             = await new Date(this.todo.value.dateEnd);
    var Difference_In_Time  = await dateEnd.getTime() - dateStart.getTime();
    var Difference_In_Days  = await Difference_In_Time / (1000*3600*24);
    this.numDay   = await Difference_In_Days;
    this.formData = true;
    let userId = await this.storage.get('userId');

    await this.api.getdata('report/reportHeadMember&user_id='+userId+'&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
      this.dataDetail = res;
    });
  }
}
