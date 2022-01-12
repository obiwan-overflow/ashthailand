import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-form-step2',
  templateUrl: './form-step2.page.html',
  styleUrls: ['./form-step2.page.scss'],
})
export class FormStep2Page implements OnInit {

  id:any;
  dataLists:any;
  form = {
    answer:{
      answer:{}
    }
  };
  constructor(public router:Router,public alertController:AlertController,public route:ActivatedRoute,public api:RestApiService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('questionnaire&id_category='+this.id).subscribe(res => {
      this.dataLists     = res.rows;
    });
  }

  ngOnInit() {
  }
  async formAnswer(){
    console.log(this.form);
    // this.presentAlertConfirm();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'ยืนยันการบันทึกข้อมูล',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigateByUrl('form-success');
          }
        }
      ]
    });

    await alert.present();
  }

}
