import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-form-draft',
  templateUrl: './form-draft.page.html',
  styleUrls: ['./form-draft.page.scss'],
})
export class FormDraftPage implements OnInit {
  data:any = [];
  constructor(public storage:Storage) { }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    let dataStorage = [];
    dataStorage = await this.storage.get('formfamily');
    if(dataStorage !== null){
      var helper = {};
      var result = dataStorage.reduce(function(r, o) {
        var key = o.MOO + '-' + o.VIL + '-' + o.A1;
        
        if(!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
          r.push(helper[key]);
        }
  
        return r;
      }, []);
      this.data = result;
    }
  }
}
