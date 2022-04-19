import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportHeadPeoplePageRoutingModule } from './report-head-people-routing.module';

import { ReportHeadPeoplePage } from './report-head-people.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportHeadPeoplePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReportHeadPeoplePage]
})
export class ReportHeadPeoplePageModule {}
