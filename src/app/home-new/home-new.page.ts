import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.page.html',
  styleUrls: ['./home-new.page.scss'],
})
export class HomeNewPage implements OnInit {

  fullname:any;
  constructor(private storage: Storage) {
    
  }

  ngOnInit() {
  }
  async ionViewDidEnter(){
    this.storage.get('fullname').then((data)=>{
      this.fullname = data;
    });
  }
}
