import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { AlertController,LoadingController,ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  todo:any = [];
  name:any;
  lastname:any;
  organization_name:any;
  province:any;
  district:any;
  subdistrict:any;
  phone:any;
  id:any;
  image:any;
  dataProvince:any = [];
  dataAmphures:any = [];
  dataTombons:any = [];
  detailProvince:any = [];

  // loading 
  loading:any;
  loadingImg:any;
  saveloading:any;

  // images
  profileImg:any;
  userImg: any = '';
  base64Img = '';
  imagesarray: any = [];

  compareWithFn(o1, o2) {
    return o1 === o2;
  };
  constructor(
    public api:RestApiService,
    public storage:Storage,
    public alertController:AlertController,
    public loadingController:LoadingController,
    public router:Router,
    public toastController:ToastController,
    private camera: Camera,
  ) {

  }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    await this.presentLoading();
    // await this.loadDataselect();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    this.loading.present();

    await this.storage.get('userData').then((data)=>{
      this.name               = data.name;
      this.lastname           = data.lastname;
      this.organization_name  = data.organization_name;
      this.province           = data.province;
      this.district           = data.district;
      this.subdistrict        = data.subdistrict;
      this.phone              = data.phone;
      this.id                 = data.id;
      this.image              = data.image == " " ? 'assets/images/user-theme.png' : data.image;
    });
    await this.api.getdata('member/getProvincesList&id_province='+this.province+'&id_amphures='+this.district+'&id_tombons='+this.subdistrict).subscribe((res)=>{
      this.detailProvince = res.detail;
      this.stopLoading();
    });
  }
  async stopLoading(){
    await this.loading.dismiss();
    console.log('Loading dismissed!');
  }

  // images
  gelleryOptions: CameraOptions = {
    quality: 50,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: false
  }
  async openGallery() {
    this.loadingImage();
    this.camera.getPicture(this.gelleryOptions).then((imgData) => {
      this.base64Img = 'data:image/jpeg;base64,' + imgData;
      // this.userImg = this.base64Img;
      this.updateImages(this.base64Img);
      }, (err) => {
      console.log(err);
      })
  }
  async loadingImage() {
    this.loadingImg = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กรุณารอสักครู่...',
    });
    this.loadingImg.present();
  }
  async updateImages(images){
    this.image = images;
    this.loadingImg.dismiss();
  }


  // form
  async form(){
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
            console.log('Confirm Okay');
            
            const formData = new FormData();
            formData.append('id',this.id);
            formData.append('name',this.todo.name !== undefined ? this.todo.name : this.name);
            formData.append('lastname',this.todo.lastname !== undefined ? this.todo.lastname : this.lastname);
            formData.append('organization_name',this.todo.organization_name !== undefined ? this.todo.organization_name : this.organization_name);
            formData.append('province',this.todo.province !== undefined ? this.todo.province : this.province);
            formData.append('district',this.todo.district !== undefined ? this.todo.district : this.district);
            formData.append('subdistrict',this.todo.subdistrict !== undefined ? this.todo.subdistrict : this.subdistrict);
            formData.append('phone',this.todo.phone !== undefined ? this.todo.phone : this.phone);
            formData.append('image',this.image);
            this.api.postdata('member/editProfile',formData).subscribe((res)=>{
              if(res.result == 'success'){
                this.uploadLoading();
                this.setUserData(res.detail);
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
  async uploadLoading() {
    this.saveloading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'กำลังบันทึกข้อมูล...',
    });
    this.saveloading.present();
  }

  async setUserData(data){
    await this.storage.remove('userData');
    await this.storage.set('userData',data);
    await this.saveloading.dismiss();
    await this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'แก้ไขข้อมูลเรียบร้อย',
      duration: 2000,
      color:"success",
      position:"top"
    });
    toast.present();
  }
  async loadDataselect(){
    await this.api.getdata('member/getProvinces').subscribe((res)=>{
      this.dataProvince = res.detail;
    });
    await this.api.getdata('member/getAmphures&id_provinces='+this.province).subscribe((res)=>{
      this.dataAmphures = res.detail;
    });
    await this.api.getdata('member/getTombons&id_provinces='+this.province+'&id_amphures='+this.district).subscribe((res)=>{
      this.dataTombons = res.detail;
    });
  }
}
