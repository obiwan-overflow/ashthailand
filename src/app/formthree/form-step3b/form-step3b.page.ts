import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../../rest-api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AlertController,LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-step3b',
  templateUrl: './form-step3b.page.html',
  styleUrls: ['./form-step3b.page.scss'],
})
export class FormStep3bPage implements OnInit {
  dataStorage:any = [];
  id:any;
  private ionicForm : FormGroup;
  constructor(
    public storage:Storage,
    public api:RestApiService,
    public router:Router,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public formBuilder: FormBuilder,
    public route:ActivatedRoute
  ) {
    this.ionicForm = this.formBuilder.group({
      month: ['',[Validators.required]]
    });
  }

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
  async Form(){
    let month = this.ionicForm.value.month;
    this.dataStorage[this.id].EXSMOKE_M = month;
   
    await this.storage.set('formfamily',this.dataStorage);
    await this.formConfirm(month);
  }
  async formConfirm(month){
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
            this.router.navigateByUrl('/formthree/form-family-lists/'+this.id+'/success');
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
            // formData.append('EVERSMOKE',this.EVERSMOKE);
            // formData.append('EXSMOKE_Y',this.EXSMOKE_Y);
            // formData.append('EXSMOKE_M',month);
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
