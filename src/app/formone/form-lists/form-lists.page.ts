import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';

@Component({
  selector: 'app-form-lists',
  templateUrl: './form-lists.page.html',
  styleUrls: ['./form-lists.page.scss'],
})
export class FormListsPage implements OnInit {

  id:any;
  listsData:any;
  constructor(public api:RestApiService,public route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('reportQuestion/lists&id='+this.id).subscribe(res => {
      this.listsData = res.lists;
    });
  }

  ngOnInit() {
  }

}
