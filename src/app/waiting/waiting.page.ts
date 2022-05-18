import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.page.html',
  styleUrls: ['./waiting.page.scss'],
})
export class WaitingPage implements OnInit {

  constructor(
    public loadingController:LoadingController,
    public route:ActivatedRoute,
    public router:Router
  ) {
    
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 3000
    });
    await loading.present();
    let MOO  = await this.route.snapshot.paramMap.get('MOO');
    let VIL  = await this.route.snapshot.paramMap.get('VIL');
    let A1   = await this.route.snapshot.paramMap.get('A1');
    this.router.navigateByUrl('formthree/form-family-lists/'+MOO+'/'+VIL+'/'+A1+'/success');
  }

}
