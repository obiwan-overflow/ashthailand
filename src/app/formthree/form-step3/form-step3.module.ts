import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep3PageRoutingModule } from './form-step3-routing.module';

import { FormStep3Page } from './form-step3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep3PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormStep3Page]
})
export class FormStep3PageModule {}
