import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

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
  titleHead:any;
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
      location: ['', Validators.required],
      locationSub: ['', Validators.required]
    });
    this.formData = true;
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('userData').then((data)=>{
      this.user = data;
    });
    this.id = await this.route.snapshot.paramMap.get('id');
    if(this.id == '1'){
      this.titleHead = "สังเกตสถานที่สาธารณะ";
    }else if(this.id == '2'){
      this.titleHead = "สังเกตร้านค้า";
    }else if(this.id == '3'){
      this.titleHead = "แบบสัมภาษณ์พฤติกรรมการสูบบุหรี่";
    }
    this.display = "hide";
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
    this.numDay   = await Difference_In_Days;
    if(this.numDay == 0){
      this.numDay = 1;
    }
    if(this.numDay < 1){
      loading.dismiss();
      this.presentAlert();
    }else{
      this.formData = true;
      await this.api.getdata('report/reportAdmin&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
        this.dataDetail = res;
      });
      await loading.dismiss();
    }
  }
  async selectlocation(event){
    this.display = "show";
    console.log(event.detail.value);
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
