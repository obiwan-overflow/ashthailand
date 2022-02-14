import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormListsPageRoutingModule } from './form-lists-routing.module';

import { FormListsPage } from './form-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormListsPageRoutingModule
  ],
  declarations: [FormListsPage]
})
export class FormListsPageModule {}
