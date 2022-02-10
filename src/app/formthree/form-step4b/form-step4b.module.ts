import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep4bPageRoutingModule } from './form-step4b-routing.module';

import { FormStep4bPage } from './form-step4b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep4bPageRoutingModule
  ],
  declarations: [FormStep4bPage]
})
export class FormStep4bPageModule {}
