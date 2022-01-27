import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTwo2PageRoutingModule } from './form-two2-routing.module';

import { FormTwo2Page } from './form-two2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormTwo2PageRoutingModule
  ],
  declarations: [FormTwo2Page]
})
export class FormTwo2PageModule {}
