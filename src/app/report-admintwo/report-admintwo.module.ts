import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportAdmintwoPageRoutingModule } from './report-admintwo-routing.module';

import { ReportAdmintwoPage } from './report-admintwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportAdmintwoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReportAdmintwoPage]
})
export class ReportAdmintwoPageModule {}
