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
    this.formData = true;
  }
}
