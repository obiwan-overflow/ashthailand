import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep7Page } from './form-step7.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep7Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep7PageRoutingModule {}
