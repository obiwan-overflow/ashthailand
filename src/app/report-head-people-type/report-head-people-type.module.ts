import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportHeadPeopleTypePageRoutingModule } from './report-head-people-type-routing.module';

import { ReportHeadPeopleTypePage } from './report-head-people-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportHeadPeopleTypePageRoutingModule
  ],
  declarations: [ReportHeadPeopleTypePage]
})
export class ReportHeadPeopleTypePageModule {}
