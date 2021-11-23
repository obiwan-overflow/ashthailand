import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RePasswordPageRoutingModule } from './re-password-routing.module';

import { RePasswordPage } from './re-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RePasswordPageRoutingModule
  ],
  declarations: [RePasswordPage]
})
export class RePasswordPageModule {}
