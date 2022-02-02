import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep5PageRoutingModule } from './form-step5-routing.module';

import { FormStep5Page } from './form-step5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep5PageRoutingModule
  ],
  declarations: [FormStep5Page]
})
export class FormStep5PageModule {}
