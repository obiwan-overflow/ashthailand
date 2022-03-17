import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-response',
  templateUrl: './form-response.page.html',
  styleUrls: ['./form-response.page.scss'],
})
export class FormResponsePage implements OnInit {

  dataStorage:any = [];
  id:any;
  constructor(
    public storage:Storage,
    public api:RestApiService,
    public router:Router,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.id = await this.route.snapshot.paramMap.get('id');
    this.dataStorage = await this.storage.get('formfamily');

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async form(event){
    let answerVal = event.srcElement.id;
    if(answerVal == "1"){
      if(this.dataStorage[this.id].CIG == "1"){

        this.dataStorage[this.id].RESPONSE   = answerVal;
        await this.storage.set('formfamily',this.dataStorage);
        await this.router.navigateByUrl('formthree/form-step10/'+this.id);

      }else if(this.dataStorage[this.id].ROLL == "1" || this.dataStorage[this.id].E_CIG == "1" || this.dataStorage[this.id].OTHER == "1"){
        
        this.dataStorage[this.id].RESPONSE   = answerVal;
        await this.storage.set('formfamily',this.dataStorage);
        await this.router.navigateByUrl('formthree/form-step11/'+this.id);
        
      }else{

        this.dataStorage[this.id].RESPONSE   = answerVal;
        await this.storage.set('formfamily',this.dataStorage);
        await this.formConfirm(answerVal);

      }
    }else{

      this.dataStorage[this.id].RESPONSE   = answerVal;
      await this.storage.set('formfamily',this.dataStorage);
      await this.formConfirm(answerVal);

    }
  }
  async formConfirm(answerVal){
    const userId = await this.storage.get('userId');
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
            this.dataStorage[this.id].status   = "success";
            this.storage.set('formfamily',this.dataStorage);
            // this.router.navigateByUrl('/formthree/form-family-lists/'+this.id+'/success');
            this.router.navigateByUrl('/formthree/form-family-lists/'+this.dataStorage[this.id].MOO+'/'+this.dataStorage[this.id].VIL+'/'+this.dataStorage[this.id].A1+'/success');
            // const formData = new FormData();
            // formData.append('cat_id',"3");
            // formData.append('user_id',userId);
            // formData.append('MEMBER',this.MEMBER),
            // formData.append('PERSON_NO',this.PERSON_NO),
            // formData.append('SEX',this.SEX),
            // formData.append('AGE',this.AGE),
            // formData.append('CWT',this.CWT);
            // formData.append('TMP',this.TMP);
            // formData.append('ID1',this.ID1);
            // formData.append('VIL',this.VIL);
            // formData.append('MOO',this.MOO);
            // formData.append('A1',this.A1);
            // formData.append('NAME',this.NAME);
            // formData.append('ADDRESS',this.ADDRESS);
            // formData.append('LAT',this.LAT);
            // formData.append('LONG',this.LONG);
            // formData.append('SMOKE',this.SMOKE);
            // formData.append('TIME_Y',this.TIME_Y);
            // formData.append('TIME_M',this.TIME_M);
            // formData.append('CIG',this.CIG);
            // formData.append('ROLL',this.ROLL);
            // formData.append('E_CIG',this.E_CIG);
            // formData.append('OTHER',this.OTHER);
            // formData.append('NO1',(this.NO1+this.NO2));
            // formData.append('RESPONSE',id);
            // this.api.postdata('reportQuestion',formData).subscribe((res)=>{
            //   if(res.result == 'success'){
            //     if(this.MEMBER - this.PERSON_NO !== 0){
            //       this.router.navigateByUrl('/formthree/form-family-lists');
            //     }else{
            //       this.presentAlertConfirm();
            //     }
            //   }
            // });
          }
        }
      ]
    });
    await alert.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'สำเร็จ!',
      message: 'เก็บข้อมูลในครัวเรือนครบแล้ว',
      backdropDismiss:false,
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            this.router.navigateByUrl('tabs/form');
          }
        }
      ]
    });

    await alert.present();
  }
}
