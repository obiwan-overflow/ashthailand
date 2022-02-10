import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep10PageRoutingModule } from './form-step10-routing.module';

import { FormStep10Page } from './form-step10.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep10PageRoutingModule
  ],
  declarations: [FormStep10Page]
})
export class FormStep10PageModule {}
