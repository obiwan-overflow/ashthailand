import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep8Page } from './form-step8.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep8Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep8PageRoutingModule {}
