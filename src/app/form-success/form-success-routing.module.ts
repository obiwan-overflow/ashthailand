import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormSuccessPage } from './form-success.page';

const routes: Routes = [
  {
    path: '',
    component: FormSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormSuccessPageRoutingModule {}
