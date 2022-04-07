import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportHeadListsPageRoutingModule } from './report-head-lists-routing.module';

import { ReportHeadListsPage } from './report-head-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportHeadListsPageRoutingModule
  ],
  declarations: [ReportHeadListsPage]
})
export class ReportHeadListsPageModule {}
