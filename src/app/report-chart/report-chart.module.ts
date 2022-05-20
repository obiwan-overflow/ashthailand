import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportChartPageRoutingModule } from './report-chart-routing.module';

import { ReportChartPage } from './report-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportChartPageRoutingModule
  ],
  declarations: [ReportChartPage]
})
export class ReportChartPageModule {}
