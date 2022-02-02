import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep4Page } from './form-step4.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep4PageRoutingModule {}
