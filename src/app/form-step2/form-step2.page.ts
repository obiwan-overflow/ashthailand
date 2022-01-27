import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-form-step2',
  templateUrl: './form-step2.page.html',
  styleUrls: ['./form-step2.page.scss'],
})
export class FormStep2Page implements OnInit {

  id:any;
  dataLists:any;
  form = {
    answer:{}
  };
  answer:any;
  CWT:any;
  TMP:any;
  ID1:any;
  VIL:any;
  MOO:any;
  A1:any;
  NAME:any;
  ADDRESS:any;
  LAT:any;
  LONG:any;
  constructor(public router:Router,public alertController:AlertController,public route:ActivatedRoute,public api:RestApiService,public storage:Storage) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('questionnaire&id_category='+this.id).subscribe(res => {
      // console.log(res);
      this.dataLists     = res.rows;
    });
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('CWT').then((data)=>{
      this.CWT = data;
    });
    await this.storage.get('TMP').then((data)=>{
      this.TMP = data;
    });
    await this.storage.get('ID1').then((data)=>{
      this.ID1 = data;
    });
    await this.storage.get('VIL').then((data)=>{
      this.VIL = data;
    });
    await this.storage.get('MOO').then((data)=>{
      this.MOO = data;
    });
    await this.storage.get('A1').then((data)=>{
      this.A1 = data;
    });
    await this.storage.get('NAME').then((data)=>{
      this.NAME = data;
    });
    await this.storage.get('ADDRESS').then((data)=>{
      this.ADDRESS = data;
    });
    await this.storage.get('LAT').then((data)=>{
      this.LAT = data;
    });
    await this.storage.get('LONG').then((data)=>{
      this.LONG = data;
    });
  }
  async formAnswer(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'บันทึก!',
      message: 'ยืนยันการบันทึกข้อมูล',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'บันทึก',
          handler: () => {
            console.log('Confirm Okay');

            const formData = new FormData();
            formData.append('cat_id',this.id);
            formData.append('CWT',this.CWT);
            formData.append('TMP',this.TMP);
            formData.append('ID1',this.ID1);
            formData.append('VIL',this.VIL);
            formData.append('MOO',this.MOO);
            formData.append('A1',this.A1);
            formData.append('NAME',this.NAME);
            formData.append('ADDRESS',this.ADDRESS);
            formData.append('LAT',this.LAT);
            formData.append('LONG',this.LONG);
            formData.append('P1A',this.form.answer[0]);
            formData.append('P2A',this.form.answer[1]);
            formData.append('P3A',this.form.answer[2]);
            formData.append('P4A',this.form.answer[3]);
            formData.append('P5A',this.form.answer[4]);
            // formData.append('answer',JSON.stringify(this.form.answer));
            
            
            this.api.postdata('reportQuestion',formData).subscribe((res)=>{
              if(res.result == 'success'){
                this.router.navigateByUrl('form-success');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
