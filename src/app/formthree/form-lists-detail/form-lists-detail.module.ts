import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormListsDetailPageRoutingModule } from './form-lists-detail-routing.module';

import { FormListsDetailPage } from './form-lists-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormListsDetailPageRoutingModule
  ],
  declarations: [FormListsDetailPage]
})
export class FormListsDetailPageModule {}
