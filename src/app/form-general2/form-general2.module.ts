import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormGeneral2PageRoutingModule } from './form-general2-routing.module';

import { FormGeneral2Page } from './form-general2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormGeneral2PageRoutingModule
  ],
  declarations: [FormGeneral2Page]
})
export class FormGeneral2PageModule {}
