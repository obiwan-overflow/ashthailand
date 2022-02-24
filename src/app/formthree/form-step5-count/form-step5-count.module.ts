import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep5CountPageRoutingModule } from './form-step5-count-routing.module';

import { FormStep5CountPage } from './form-step5-count.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep5CountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormStep5CountPage]
})
export class FormStep5CountPageModule {}
