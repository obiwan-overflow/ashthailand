import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { AlertController } from '@ionic/angular';
import { RestApiService } from './rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userId:any;
  fullname:any;
  constructor(
    private storage: Storage,
    public route:Router,
    public navCtrl: NavController,
    private network: Network,
    public alertController: AlertController,
    private api:RestApiService
  ) {
    document.addEventListener("offline",()=>{
      // this.alertNetwork();
    });
    document.addEventListener("online",()=>{
      this.updateData();
    });
  }
  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    await this.storage.get('userId').then((data)=>{
      this.userId = data;
    });
    await this.storage.get('fullname').then((data)=>{
      this.fullname = data;
    });
  }
  async logout(){
    await this.storage.remove('userId');
    await this.storage.remove('fullname');
    await this.storage.remove('userData');
    await this.route.navigate(['home-new']);
    await location.reload();
  }
  async alertNetwork(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Network !',
      message: 'การเชื่อมต่อ Internet ของคุณมีปัญหา',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async updateData(){
    let dataPublic = await this.storage.get('formPublicFailed');
    for (let index = 0; index < dataPublic.length; index++) {
      const element = dataPublic[index];

      // const formData = new FormData();
      // formData.append('cat_id',"1");
      // formData.append('user_id',element.userId);
      // formData.append('organization_name',element.organization_name);
      // formData.append('CWT',element.CWT);
      // formData.append('TMP',element.TMP);
      // formData.append('ID1',element.ID1);
      // formData.append('VIL',element.VIL);
      // formData.append('MOO',element.MOO);
      // formData.append('A1',element.A1);
      // formData.append('NAME',element.NAME);
      // formData.append('ADDRESS',element.ADDRESS);
      // formData.append('LAT',element.LAT);
      // formData.append('LONG',element.LONG);
      // formData.append('P1A',element.P1A);
      // formData.append('P2A',element.P2A);
      // formData.append('P3A',element.P3A);
      // formData.append('P4A',element.P4A);
      // formData.append('P5A',element.P5A == undefined ? "" : element.P5A);
      // this.api.postdata('reportQuestion',formData).subscribe((res)=>{
      //   if(res.result == 'success'){
      //     this.deleteData(index);
      //   }
      // },(err)=>{
      //   alert(err);
      // });
    }
  }
  async deleteData(index){
    let dataPublic = await this.storage.get('formPublicFailed');
    dataPublic.splice(index,1);
    this.storage.set('formpublic',dataPublic);
  }
}
