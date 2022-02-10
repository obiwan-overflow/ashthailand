import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep12PageRoutingModule } from './form-step12-routing.module';

import { FormStep12Page } from './form-step12.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep12PageRoutingModule
  ],
  declarations: [FormStep12Page]
})
export class FormStep12PageModule {}
