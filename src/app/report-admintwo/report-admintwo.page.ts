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
    var dateStart           = new Date(this.todo.value.dateStart);
    var dateEnd             = new Date(this.todo.value.dateEnd);
    var Difference_In_Time  = dateEnd.getTime() - dateStart.getTime();
    var Difference_In_Days  = Difference_In_Time / (1000*3600*24);
    this.numDay = Difference_In_Days;
    this.formData = true;
  }
  async selectlocation(){
    this.display = "show";
  }
}
