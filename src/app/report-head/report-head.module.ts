import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportHeadPageRoutingModule } from './report-head-routing.module';

import { ReportHeadPage } from './report-head.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportHeadPageRoutingModule
  ],
  declarations: [ReportHeadPage]
})
export class ReportHeadPageModule {}
