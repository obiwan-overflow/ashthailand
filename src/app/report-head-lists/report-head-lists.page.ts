import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-head-lists',
  templateUrl: './report-head-lists.page.html',
  styleUrls: ['./report-head-lists.page.scss'],
})
export class ReportHeadListsPage implements OnInit {
  private todo : FormGroup;
  user:any = {};
  formData:boolean;
  numDay:any;
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
  }
}
