import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep11PageRoutingModule } from './form-step11-routing.module';

import { FormStep11Page } from './form-step11.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep11PageRoutingModule
  ],
  declarations: [FormStep11Page]
})
export class FormStep11PageModule {}
