import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormtwoDetailPageRoutingModule } from './formtwo-detail-routing.module';

import { FormtwoDetailPage } from './formtwo-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormtwoDetailPageRoutingModule
  ],
  declarations: [FormtwoDetailPage]
})
export class FormtwoDetailPageModule {}
