import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AuthService } from 'src/app/AuthService';
import { ActionSheetController,LoadingController,ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.page.html',
  styleUrls: ['./form4.page.scss'],
})
export class Form4Page implements OnInit {

  titlePub:any;
  dataStorage:any = [];
  dataStorage_step1:any = [];
  numberId:any;
  todo:any = [];
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
    public toastController:ToastController,
    public alertController:AlertController
  ) {
    this.titlePub = this.auth.titlePublic();
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
      duration: 200
    });
    await loading.present();

    this.dataStorage_step1  = await this.storage.get('formpublic_step1');
    this.dataStorage        = await this.storage.get('formpublic');
    this.numberId           = await this.route.snapshot.paramMap.get('id');

    if(this.numberId == 'continue'){
      this.todo = {
        NAME: '',
        ADDRESS: ''
      }
    }else{
      this.todo = {
        NAME: this.dataStorage[this.numberId].NAME,
        ADDRESS: this.dataStorage[this.numberId].ADDRESS
      }
    }
  }
  async formData(form){
    if(form.value.ADDRESS == '' || form.value.NAME == ''){
      this.alert();
    }else{
      if(this.numberId == 'continue'){
        if(this.dataStorage == null){
          this.dataStorage = [];
        }
        let dataAnswer = {
          "CWT":this.dataStorage_step1.CWT,
          "ID1":this.dataStorage_step1.ID1,
          "TMP":this.dataStorage_step1.TMP,
          "LAT":this.dataStorage_step1.LAT,
          "LONG":this.dataStorage_step1.LONG,
          "MOO":this.dataStorage_step1.MOO,
          "VIL":this.dataStorage_step1.VIL,
          "A1":this.dataStorage_step1.A1,
          "NAME":form.value.NAME,
          "ADDRESS":form.value.ADDRESS,
        }
        await this.storage.set('formpublic_step1',dataAnswer);
        await this.dataStorage.push(dataAnswer);
        await this.storage.set('formpublic',this.dataStorage);
        let lengthArray = await this.storage.get('formpublic');
        let numberIdNext    = lengthArray.length - 1;
        await this.router.navigateByUrl('/formone/form-step1/'+numberIdNext);
      }else{
        this.dataStorage[this.numberId].NAME    = form.value.NAME;
        this.dataStorage[this.numberId].ADDRESS = form.value.ADDRESS;
        await this.storage.set('formpublic',this.dataStorage);
        await this.router.navigateByUrl('/formone/form-step1/'+this.numberId);
      }
    }
  }
  
  // loadding
  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ตรวจสอบ',
      message: 'กรุณากรอกข้อมูล !!!',
    });
    
    await alert.present();
  }
  async loadingImage() {
    this.loadingImg = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    this.loadingImg.present();
  }


  // async presentActionSheet() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'อัพโหลดรูปภาพ',
  //     cssClass: 'my-custom-class',
  //     buttons: [{
  //       text: 'เปิดกล้อง',
  //       icon: 'camera',
  //       handler: () => {
  //         this.openCamera();
  //       }
  //     }, {
  //       text: 'เปิดอัลบั้มรูป',
  //       icon: 'image',
  //       handler: () => {
  //         this.openGallery();
  //       }
  //     }, {
  //       text: 'ยกเลิก',
  //       icon: 'close',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }
  // images
  // cameraOptions: CameraOptions = {
  //   quality: 30,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   allowEdit: false
  // }
  // gelleryOptions: CameraOptions = {
  //   quality: 30,
  //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE,
  //   allowEdit: false
  // }
  // async openCamera(){
  //   this.loadingImage();
  //   this.camera.getPicture(this.cameraOptions).then((imgData) => {
  //     console.log('image data =>  ', imgData);
  //     this.base64Img = 'data:image/jpeg;base64,' + imgData;
  //     this.userImg = this.base64Img;
  //     this.updateImages(this.userImg);
  //   }, (err) => {
  //     console.log(err);
  //   })
  // }
  // async openGallery() {
  //   this.loadingImage();
  //   this.camera.getPicture(this.gelleryOptions).then((imgData) => {
  //    console.log('image data =>  ', imgData);
  //    this.base64Img = 'data:image/jpeg;base64,' + imgData;
  //    this.userImg = this.base64Img;
  //    this.updateImages(this.userImg);
  //   }, (err) => {
  //    console.log(err);
  //   })
  // }
  // async updateImages(images){
  //   await this.imagesarray.push(images);
  //   await this.loadingImg.dismiss();
  // }
}
