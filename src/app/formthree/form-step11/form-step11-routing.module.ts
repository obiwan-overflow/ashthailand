import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep11Page } from './form-step11.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep11Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep11PageRoutingModule {}
