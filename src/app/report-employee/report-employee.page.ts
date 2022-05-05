import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { format, parseISO } from 'date-fns';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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
  dataPublic:any = [];
  dataShop:any = [];
  dataFamily:any = [];
  constructor(
    public api:RestApiService,
    public storage:Storage,
    private formBuilder: FormBuilder,
    public alertController:AlertController
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
    var dateStart           = await new Date(this.todo.value.dateStart);
    var dateEnd             = await new Date(this.todo.value.dateEnd);
    var Difference_In_Time  = await dateEnd.getTime() - dateStart.getTime();
    var Difference_In_Days  = await Difference_In_Time / (1000*3600*24);
    
    this.numDay   = await Difference_In_Days;
    if(this.numDay <= 0){
      this.presentAlert();
    }else{
      this.formData = true;
      let userId = await this.storage.get('userId');
      await this.api.getdata('report/reportMember&user_id='+userId+'&cat_id=1'+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
        this.dataPublic = res;
      });
      await this.api.getdata('report/reportMember&user_id='+userId+'&cat_id=2'+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
        this.dataShop = res;
      });
      await this.api.getdata('report/reportMember&user_id='+userId+'&cat_id=3'+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
        this.dataFamily = res;
      });
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Alert',
      message: 'กดเลือกวันไม่ถูกต้อง !!',
      buttons: ['ตกลง']
    });
    await alert.present();
  }
}
