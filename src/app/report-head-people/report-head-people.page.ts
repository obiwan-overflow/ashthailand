import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

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
  titleHead:any;
  titleCount:any;

  sumTotal:any;
  sumToday:any;
  sumSum:any;
  sumPeople:any;
  constructor(
    public api:RestApiService,
    public storage:Storage,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
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
    this.id = await this.route.snapshot.paramMap.get('id');
    if(this.id == '1'){
      this.titleHead  = "สังเกตสถานที่สาธารณะ";
      this.titleCount = "แห่ง";
    }else if(this.id == '2'){
      this.titleHead = "สังเกตร้านค้า";
      this.titleCount = "ร้าน";
    }else if(this.id == '3'){
      this.titleHead = "แบบสัมภาษณ์พฤติกรรมการสูบบุหรี่";
      this.titleCount = "ครัวเรือน";
    }
  }
  async logForm(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่ ...',
      backdropDismiss:true
    });
    var dateStart           = await new Date(this.todo.value.dateStart);
    var dateEnd             = await new Date(this.todo.value.dateEnd);
    var Difference_In_Time  = await dateEnd.getTime() - dateStart.getTime();
    var Difference_In_Days  = await Difference_In_Time / (1000*3600*24);
    this.numDay             = await Difference_In_Days;
    
    this.numDay = this.numDay+1;
    if(this.numDay < 1){
      loading.dismiss();
      this.presentAlert();
    }else{
      this.formData = true;
      let userId = await this.storage.get('userId');
      await this.api.getdata('report/reportHeadMember&user_id='+userId+'&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
        this.dataDetail = res;

        let sumTotal    = 0;
        let sumToday    = 0;
        let sumSum      = 0;
        let sumPeople   = 0;
        for (let index = 0; index < res.length; index++) {
          let element = res[index];
          sumTotal    += parseInt(element['total']);
          sumToday    += parseInt(element['sum_today']);
          sumSum      += parseInt(element['sum']);
          sumPeople   += parseInt(element['sum_people']);
        }
        this.sumTotal   = sumTotal;
        this.sumToday   = sumToday;
        this.sumSum     = sumSum;
        this.sumPeople  = sumPeople;
      });
      await loading.dismiss();
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
