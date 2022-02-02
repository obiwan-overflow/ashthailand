import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep5Page } from './form-step5.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep5PageRoutingModule {}
