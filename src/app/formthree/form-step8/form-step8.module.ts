import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep8PageRoutingModule } from './form-step8-routing.module';

import { FormStep8Page } from './form-step8.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep8PageRoutingModule
  ],
  declarations: [FormStep8Page]
})
export class FormStep8PageModule {}
