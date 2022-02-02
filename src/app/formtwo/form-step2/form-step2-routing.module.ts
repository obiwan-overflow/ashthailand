import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep2Page } from './form-step2.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep2PageRoutingModule {}
