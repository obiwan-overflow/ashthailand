import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep2PageRoutingModule } from './form-step2-routing.module';

import { FormStep2Page } from './form-step2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep2PageRoutingModule
  ],
  declarations: [FormStep2Page]
})
export class FormStep2PageModule {}
