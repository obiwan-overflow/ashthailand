import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep1Page } from './form-step1.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep1PageRoutingModule {}
