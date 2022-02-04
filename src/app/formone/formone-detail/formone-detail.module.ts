import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormoneDetailPageRoutingModule } from './formone-detail-routing.module';

import { FormoneDetailPage } from './formone-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormoneDetailPageRoutingModule
  ],
  declarations: [FormoneDetailPage]
})
export class FormoneDetailPageModule {}
