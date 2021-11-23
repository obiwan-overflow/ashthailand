import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormSuccessPageRoutingModule } from './form-success-routing.module';

import { FormSuccessPage } from './form-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormSuccessPageRoutingModule
  ],
  declarations: [FormSuccessPage]
})
export class FormSuccessPageModule {}
