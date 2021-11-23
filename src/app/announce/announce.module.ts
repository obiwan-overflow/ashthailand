import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnouncePageRoutingModule } from './announce-routing.module';

import { AnnouncePage } from './announce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnouncePageRoutingModule
  ],
  declarations: [AnnouncePage]
})
export class AnnouncePageModule {}
