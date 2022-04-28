import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { format, parseISO } from 'date-fns';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-employee',
  templateUrl: './report-employee.page.html',
  styleUrls: ['./report-employee.page.scss'],
})
export class ReportEmployeePage implements OnInit {
  private todo : FormGroup;
  user:any = {};
  formData:boolean;
  numDay:any;
  dataPublic:any;
  constructor(
    public api:RestApiService,
    public storage:Storage,
    private formBuilder: FormBuilder
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
  }
  async logForm(){
    var dateStart           = new Date(this.todo.value.dateStart);
    var dateEnd             = new Date(this.todo.value.dateEnd);
    var Difference_In_Time  = dateEnd.getTime() - dateStart.getTime();
    var Difference_In_Days  = Difference_In_Time / (1000*3600*24);
    this.numDay = Difference_In_Days;
    this.formData = true;

    let userId = await this.storage.get('userId');
    this.api.getdata('report/reportMember&user_id='+userId+'&cat_id=1').subscribe((res)=>{
      console.log(res);
    });
  }
}
