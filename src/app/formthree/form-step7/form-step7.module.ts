import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep7PageRoutingModule } from './form-step7-routing.module';

import { FormStep7Page } from './form-step7.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep7PageRoutingModule
  ],
  declarations: [FormStep7Page]
})
export class FormStep7PageModule {}
