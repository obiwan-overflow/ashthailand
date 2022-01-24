import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCompletePageRoutingModule } from './form-complete-routing.module';

import { FormCompletePage } from './form-complete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCompletePageRoutingModule
  ],
  declarations: [FormCompletePage]
})
export class FormCompletePageModule {}
