import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

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
  dateNowChoose:any;

  dataPublic:any = [];
  dataShop:any = [];
  dataFamily:any = [];
  constructor(
    public api:RestApiService,
    public storage:Storage,
    private formBuilder: FormBuilder,
    public alertController:AlertController,
    public loadingController:LoadingController
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

    let dateObj = await new Date();
    let month   = await String(dateObj.getUTCMonth() + 1).padStart(2,'0');
    let day     = await String(dateObj.getUTCDate()).padStart(2,'0');
    let year    = await dateObj.getUTCFullYear();
    this.dateNowChoose = await year + "-" + month + "-" + day;
  }
  async logForm(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่ ...',
      backdropDismiss:true
    });
    var dateStart           = new Date(this.todo.value.dateStart);
    var dateEnd             = new Date(this.todo.value.dateEnd);
    var Difference_In_Time  = dateEnd.getTime() - dateStart.getTime();
    var Difference_In_Days  = Difference_In_Time / (1000*3600*24);
    this.numDay = Difference_In_Days;

    this.numDay = this.numDay+1;
    if(this.numDay < 1){
      loading.dismiss();
      this.presentAlert();
    }else{
      this.formData = true;
      let userId = await this.storage.get('userId');
      await this.api.getdata('report/reportHeadAll&user_id='+userId+'&cat_id=1&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
        this.dataPublic = res;
      });
      await this.api.getdata('report/reportHeadAll&user_id='+userId+'&cat_id=2&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
        this.dataShop = res;
      });
      await this.api.getdata('report/reportHeadAll&user_id='+userId+'&cat_id=3&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
        this.dataFamily = res;
      });
      await loading.dismiss();
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'กดเลือกวันไม่ถูกต้อง !!',
      buttons: ['ตกลง']
    });
    await alert.present();
  }
}
