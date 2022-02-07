import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep4PageRoutingModule } from './form-step4-routing.module';

import { FormStep4Page } from './form-step4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep4PageRoutingModule
  ],
  declarations: [FormStep4Page]
})
export class FormStep4PageModule {}
