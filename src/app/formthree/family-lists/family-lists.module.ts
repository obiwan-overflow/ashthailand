import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyListsPageRoutingModule } from './family-lists-routing.module';

import { FamilyListsPage } from './family-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyListsPageRoutingModule
  ],
  declarations: [FamilyListsPage]
})
export class FamilyListsPageModule {}
