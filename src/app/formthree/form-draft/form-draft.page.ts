import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-draft',
  templateUrl: './form-draft.page.html',
  styleUrls: ['./form-draft.page.scss'],
})
export class FormDraftPage implements OnInit {
  data:any = [];
  dataOut:any = [];
  constructor(
    public storage:Storage,
    public router:Router,
    public alertController:AlertController,
    public loadingController:LoadingController
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    let dataStorage = [];
    dataStorage = await this.storage.get('formfamily');
    if(dataStorage !== null){
      var helper = {};
      var result = dataStorage.reduce(function(r, o) {
        var key = o.MOO + '-' + o.VIL + '-' + o.A1;
        
        if(!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          r.push(helper[key]);
        }
  
        return r;
      }, []);
      this.data = result;
    }
  }
  async continue(MOO,VIL,A1){
    let IdMOO  = await MOO.replace("/","*kk*");
    let IdVIL  = await VIL.replace("/","*kk*");
    let IdA1   = await A1.replace("/","*kk*");
    this.router.navigateByUrl('/formthree/form-family-lists/'+IdMOO+'/'+IdVIL+'/'+IdA1+'/success');
  }
  async delete(MOO,VIL,A1){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ยืนยันการลบข้อมูล!',
      message: 'หมู่ที่ '+MOO+'ชื่อชุมชน/บ้าน '+VIL+'บ้านเลขที่ '+A1,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.confirmDelete(MOO,VIL,A1);
          }
        }
      ]
    });

    await alert.present();
  }
  async confirmDelete(MOO,VIL,A1){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    let dataFamily = [];
    dataFamily = await this.storage.get('formfamily');
    for (let i = 0; i < dataFamily.length; i++) {
      const element = dataFamily[i];
      if(element.MOO == MOO && element.VIL == VIL && element.A1 == A1){

      }else{
        this.dataOut.push(element);
      }
    }
    await this.storage.set('formfamily',this.dataOut);
    await location.assign('/tabs/form/formthree-draft');
    await loading.dismiss();
  }
}
