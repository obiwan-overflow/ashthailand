import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep6CountPage } from './form-step6-count.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep6CountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep6CountPageRoutingModule {}
