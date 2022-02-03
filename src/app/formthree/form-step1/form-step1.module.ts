import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep1PageRoutingModule } from './form-step1-routing.module';

import { FormStep1Page } from './form-step1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep1PageRoutingModule
  ],
  declarations: [FormStep1Page]
})
export class FormStep1PageModule {}
