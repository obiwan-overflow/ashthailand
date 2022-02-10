import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep9PageRoutingModule } from './form-step9-routing.module';

import { FormStep9Page } from './form-step9.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep9PageRoutingModule
  ],
  declarations: [FormStep9Page]
})
export class FormStep9PageModule {}
