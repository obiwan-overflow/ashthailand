import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AuthService } from 'src/app/AuthService';
import { ActionSheetController,LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.page.html',
  styleUrls: ['./form4.page.scss'],
})
export class Form4Page implements OnInit {
  dataStorage: any = [];
  titleShop:any;
  // loadding
  loadingImg:any;
  // images
  userImg: any = '';
  base64Img = '';
  imagesarray: any = [];
  constructor(
    public router:Router,
    public api:RestApiService,
    public route:ActivatedRoute,
    private network: Network,
    private storage: Storage,
    private camera: Camera,
    public auth:AuthService,
    public actionSheetController: ActionSheetController,
    public loadingController:LoadingController,
    public toastController:ToastController
  ) {
    this.titleShop = this.auth.titleShop();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.dataStorage = await this.storage.get('formshop');
    
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();
  }
  async formData(form){
    if(form.value.NAME == '' || form.value.ADDRESS == ''){
      this.presentToast();
    }else{
      let dataAnswer = {
        "CWT":this.dataStorage.CWT,
        "ID1":this.dataStorage.ID1,
        "TMP":this.dataStorage.TMP,
        "LAT":this.dataStorage.LAT,
        "LONG":this.dataStorage.LONG,
        "MOO":this.dataStorage.MOO,
        "VIL":this.dataStorage.VIL,
        "A1":this.dataStorage.A1,
        "NAME":form.value.NAME,
        "ADDRESS":form.value.ADDRESS,
        "images":this.imagesarray,
      }
      await this.storage.set('formshop',dataAnswer);
      await this.router.navigateByUrl('/formtwo/form-step1');
    }
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
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: false
  }
  gelleryOptions: CameraOptions = {
    quality: 30,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: false
  }
  async openCamera(){
    this.loadingImage();
    this.camera.getPicture(this.cameraOptions).then((imgData) => {
      console.log('image data =>  ', imgData);
      this.base64Img = 'data:image/jpeg;base64,' + imgData;
      this.userImg = this.base64Img;
      this.updateImages(this.userImg);
    }, (err) => {
      console.log(err);
    })
  }
  async openGallery() {
    this.loadingImage();
    this.camera.getPicture(this.gelleryOptions).then((imgData) => {
     console.log('image data =>  ', imgData);
     this.base64Img = 'data:image/jpeg;base64,' + imgData;
     this.userImg = this.base64Img;
     this.updateImages(this.userImg);
    }, (err) => {
     console.log(err);
    })
  }
  async updateImages(images){
    await this.imagesarray.push(images);
    await this.loadingImg.dismiss();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'กรุณากรอกข้อมูล',
      duration: 2000,
      color:"danger",
      position:"middle"
    });
    toast.present();
  }
  async loadingImage() {
    this.loadingImg = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    this.loadingImg.present();
  }
  todo = {
    NAME: '',
    ADDRESS: '',
  }
}
