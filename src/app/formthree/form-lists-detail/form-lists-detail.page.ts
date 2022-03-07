import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { RestApiService } from '../../rest-api.service';

@Component({
  selector: 'app-form-lists-detail',
  templateUrl: './form-lists-detail.page.html',
  styleUrls: ['./form-lists-detail.page.scss'],
})
export class FormListsDetailPage implements OnInit {

  id:any;
  listsData:any;
  constructor(public api:RestApiService,public route:ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getdata('reportQuestion/familyLists&id='+this.id).subscribe(res => {
      this.listsData = res.lists;
    });
  }

  ngOnInit() {
  }

}
