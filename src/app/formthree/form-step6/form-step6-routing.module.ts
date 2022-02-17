import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep6Page } from './form-step6.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep6PageRoutingModule {}
