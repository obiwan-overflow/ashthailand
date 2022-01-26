import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormGeneralPageRoutingModule } from './form-general-routing.module';

import { FormGeneralPage } from './form-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormGeneralPageRoutingModule
  ],
  declarations: [FormGeneralPage]
})
export class FormGeneralPageModule {}
