import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeNewPageRoutingModule } from './home-new-routing.module';

import { HomeNewPage } from './home-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeNewPageRoutingModule
  ],
  declarations: [HomeNewPage]
})
export class HomeNewPageModule {}
