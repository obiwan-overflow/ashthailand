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
  constructor(
    public api:RestApiService,
    public storage:Storage,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {
    this.todo = this.formBuilder.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      location: ['', Validators.required]
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
    this.formData = true;
  }
}
