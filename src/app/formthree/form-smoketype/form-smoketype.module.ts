import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormSmoketypePageRoutingModule } from './form-smoketype-routing.module';

import { FormSmoketypePage } from './form-smoketype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormSmoketypePageRoutingModule
  ],
  declarations: [FormSmoketypePage]
})
export class FormSmoketypePageModule {}
