import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep9Page } from './form-step9.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep9Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep9PageRoutingModule {}
