import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormFamilyListsPageRoutingModule } from './form-family-lists-routing.module';

import { FormFamilyListsPage } from './form-family-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormFamilyListsPageRoutingModule
  ],
  declarations: [FormFamilyListsPage]
})
export class FormFamilyListsPageModule {}
