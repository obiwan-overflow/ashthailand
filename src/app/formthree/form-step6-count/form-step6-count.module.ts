import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep6CountPageRoutingModule } from './form-step6-count-routing.module';

import { FormStep6CountPage } from './form-step6-count.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep6CountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormStep6CountPage]
})
export class FormStep6CountPageModule {}
