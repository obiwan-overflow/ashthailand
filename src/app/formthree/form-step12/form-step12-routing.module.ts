import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep12Page } from './form-step12.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep12Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep12PageRoutingModule {}
