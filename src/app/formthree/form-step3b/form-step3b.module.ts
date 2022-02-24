import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormStep3bPageRoutingModule } from './form-step3b-routing.module';

import { FormStep3bPage } from './form-step3b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormStep3bPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormStep3bPage]
})
export class FormStep3bPageModule {}
