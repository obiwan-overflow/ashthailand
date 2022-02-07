import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep3Page } from './form-step3.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep3PageRoutingModule {}
