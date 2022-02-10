import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormResponsePageRoutingModule } from './form-response-routing.module';

import { FormResponsePage } from './form-response.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormResponsePageRoutingModule
  ],
  declarations: [FormResponsePage]
})
export class FormResponsePageModule {}
