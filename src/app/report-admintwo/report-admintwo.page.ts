import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
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
  listsLevel:any;
  dateNowChoose:any;
  constructor(
    public api:RestApiService,
    public storage:Storage,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public router:Router
  ) {
    this.todo = this.formBuilder.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      level: ['', Validators.required],
      location: ['',],
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
    await loading.present();
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
      let select = "none";
      if(this.todo.value.level !== '1'){
        select = this.todo.value.location;
      }
      await this.api.getdata('report/reportAdmin&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd+'&level='+this.todo.value.level+'&location='+select).subscribe((res)=>{
        this.dataDetail = res;
      });
      this.formData = await true;
      await loading.dismiss();
      // if(this.todo.value.location == '1'){
      //   await this.api.getdata('report/reportAdmin&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
      //     this.dataDetail = res;
      //   });
      //   this.formData = await true;
      //   await loading.dismiss();
      // }else if (this.todo.value.location == '2'){
      //   let locationCity = await this.todo.value.locationCity;
      //   await this.api.getdata('report/reportAdmin&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
      //     this.dataDetail = res;
      //   });
      //   this.formData = await true;
      //   await loading.dismiss();
      // }else if (this.todo.value.location == '3'){
      //   let locationTombons = await this.todo.value.locationTombons;
      //   await this.api.getdata('report/reportAdmin&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
      //     this.dataDetail = res;
      //   });
      //   this.formData = await true;
      //   await loading.dismiss();
      // }else if (this.todo.value.location == '4'){
      //   let locationObt = await this.todo.value.locationObt;
      //   await this.api.getdata('report/reportAdmin&cat_id='+this.id+'&date_start='+this.todo.value.dateStart+'&date_end='+this.todo.value.dateEnd).subscribe((res)=>{
      //     this.dataDetail = res;
      //   });
      //   this.formData = await true;
      //   await loading.dismiss();
      // }
    }
  }
  async selectlocation(event){
    if(event.detail.value == '1'){
      this.display = "";
    }else if(event.detail.value == '2'){
      this.display = "เทศบาลนคร/เมือง";
      await this.api.getdata('report/getListsLevelObt&level=2').subscribe((res)=>{
        this.listsLevel = res;
      });
    }else if(event.detail.value == '3'){
      this.display = "เทศบาลตำบล";
      await this.api.getdata('report/getListsLevelObt&level=3').subscribe((res)=>{
        this.listsLevel = res;
      });
    }else if(event.detail.value == '4'){
      this.display = "อบต.";
      await this.api.getdata('report/getListsLevelObt&level=4').subscribe((res)=>{
        this.listsLevel = res;
      });
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

  async openchart(){
    this.router.navigateByUrl('report-chart');
  }
}
