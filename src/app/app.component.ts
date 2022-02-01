import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userId:any;
  fullname:any;
  constructor(private storage: Storage,public route:Router) {
   
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
    this.ionViewWillEnter();
  }
  async ionViewWillEnter(){
    await this.route.navigate(['home-new']);
    await location.reload();
  }
}
