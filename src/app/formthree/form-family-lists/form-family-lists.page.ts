import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-family-lists',
  templateUrl: './form-family-lists.page.html',
  styleUrls: ['./form-family-lists.page.scss'],
})
export class FormFamilyListsPage implements OnInit {

  dataStorage:any = [];
  // member:any;
  constructor(
    private storage: Storage,
    public router:Router,
    public loadingController:LoadingController,
    public alertController:AlertController
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    // await this.storage.get('formfamily').then((data)=>{
    //   this.member     = data.MEMBER;
    // });
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
    this.dataStorage = await this.storage.get('formfamily');
  }
  async btnStartTest(data){
    this.router.navigateByUrl('/formthree/form4/'+data);
  }
}
