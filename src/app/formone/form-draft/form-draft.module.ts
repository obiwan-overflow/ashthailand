import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormDraftPageRoutingModule } from './form-draft-routing.module';

import { FormDraftPage } from './form-draft.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormDraftPageRoutingModule
  ],
  declarations: [FormDraftPage]
})
export class FormDraftPageModule {}
