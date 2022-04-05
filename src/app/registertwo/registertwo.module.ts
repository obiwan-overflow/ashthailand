import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistertwoPageRoutingModule } from './registertwo-routing.module';

import { RegistertwoPage } from './registertwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistertwoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistertwoPage]
})
export class RegistertwoPageModule {}
