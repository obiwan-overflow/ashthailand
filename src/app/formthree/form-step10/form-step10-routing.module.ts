import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep10Page } from './form-step10.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep10Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep10PageRoutingModule {}
