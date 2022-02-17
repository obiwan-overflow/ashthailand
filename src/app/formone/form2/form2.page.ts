import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AuthService } from 'src/app/AuthService';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})
export class Form2Page implements OnInit {

  todo:any = {};
  CWT:any;
  TMP:any;
  ID1:any;
  VIL:any;
  MOO:any;
  ADDRESS:any;
  LAT:any;
  LONG:any;

  titlePub:any;

  // images
  userImg: any = '';
  base64Img = '';

  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private network: Network,
    private storage: Storage,
    private camera: Camera,
    public auth:AuthService,
    public actionSheetController: ActionSheetController
  ) {
    this.titlePub = this.auth.titlePublic();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.storage.get('public').then((data)=>{
      this.CWT      = data.CWT;
      this.TMP      = data.TMP;
      this.ID1      = data.ID1;
      this.VIL      = data.VIL;
      this.MOO      = data.MOO;
      this.ADDRESS  = data.ADDRESS;
      this.LAT      = data.LAT;
      this.LONG     = data.LONG;
    });
  }
  async formData(form){
    let dataAnswer = {
      "CWT":this.CWT,
      "TMP":this.TMP,
      "ID1":this.ID1,
      "VIL":this.VIL,
      "MOO":this.MOO,
      "ADDRESS":this.ADDRESS,
      "LAT":this.LAT,
      "LONG":this.LONG,
      "A1":form.value.A1,
      "NAME":form.value.NAME,
    }
    await this.storage.set('public',dataAnswer);
    await this.router.navigateByUrl('/formone/form-step1');
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'อัพโหลดรูปภาพ',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'เปิดกล้อง',
        icon: 'camera',
        handler: () => {
          this.openCamera();
        }
      }, {
        text: 'เปิดอัลบั้มรูป',
        icon: 'image',
        handler: () => {
          this.openGallery();
        }
      }, {
        text: 'ยกเลิก',
        icon: 'close',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true
  }
  gelleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: true
  }
  async openCamera(){
    await this.camera.getPicture(this.cameraOptions).then((imgData) => {
      console.log('image data =>  ', imgData);
      this.base64Img = 'data:image/jpeg;base64,' + imgData;
      this.userImg = this.base64Img;
    }, (err) => {
      console.log(err);
    })
  }
  async openGallery() {
    await this.camera.getPicture(this.gelleryOptions).then((imgData) => {
     console.log('image data =>  ', imgData);
     this.base64Img = 'data:image/jpeg;base64,' + imgData;
     this.userImg = this.base64Img;
    }, (err) => {
     console.log(err);
    })
  }
}
