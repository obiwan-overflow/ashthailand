import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { window } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController
  ) {
    document.addEventListener("offline",()=>{
      this.alertNetwork();
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
}
