import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep6PageRoutingModule } from './form-step6-routing.module';

import { FormStep6Page } from './form-step6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep6PageRoutingModule
  ],
  declarations: [FormStep6Page]
})
export class FormStep6PageModule {}
