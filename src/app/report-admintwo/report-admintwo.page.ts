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
  listsObt:any = [];
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
      locationCity: ['',],
      locationTombons: ['',],
      locationObt: ['',],
    });
    this.formData = false;
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
    await this.api.getdata('report/getListObt').subscribe((res)=>{
      this.listsObt = res;
    });
    this.display = '0';
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
    this.numDay   = this.numDay+1;
    if(this.numDay < 1){
      loading.dismiss();
      this.presentAlert();
    }else{
      if(this.todo.value.location == '1'){
        this.formData = true;
        await this.api.getdata('report/reportAdmin&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
          this.dataDetail = res;
        });
        await loading.dismiss();
      }else if (this.todo.value.location == '2'){

      }else if (this.todo.value.location == '3'){
        
      }else if (this.todo.value.location == '4'){
        
      }
    }
  }
  async selectlocation(event){
    if(event.detail.value == '1'){
    }else if(event.detail.value == '2'){
      this.display = '2';
    }else if(event.detail.value == '3'){
      this.display = '3';
    }else if(event.detail.value == '4'){
      this.display = '4';
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
