import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-admintwo',
  templateUrl: './report-admintwo.page.html',
  styleUrls: ['./report-admintwo.page.scss'],
})
export class ReportAdmintwoPage implements OnInit {
  private todo : FormGroup;
  user:any = {};
  formData:boolean;
  id:any;
  numDay:any;
  display:any;
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
      location: ['', Validators.required],
      locationSub: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('userData').then((data)=>{
      this.user = data;
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.display = "hide";
  }
  async logForm(){
    var dateStart           = await new Date(this.todo.value.dateStart);
    var dateEnd             = await new Date(this.todo.value.dateEnd);
    var Difference_In_Time  = await dateEnd.getTime() - dateStart.getTime();
    var Difference_In_Days  = await Difference_In_Time / (1000*3600*24);
    this.numDay   = await Difference_In_Days;
    this.formData = true;

    await this.api.getdata('report/reportAdmin&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
      this.dataDetail = res;
    });
  }
  async selectlocation(){
    this.display = "show";
  }
}
