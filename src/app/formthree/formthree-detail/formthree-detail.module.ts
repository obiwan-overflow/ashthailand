import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormthreeDetailPageRoutingModule } from './formthree-detail-routing.module';

import { FormthreeDetailPage } from './formthree-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormthreeDetailPageRoutingModule
  ],
  declarations: [FormthreeDetailPage]
})
export class FormthreeDetailPageModule {}
