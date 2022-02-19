import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep5CountPage } from './form-step5-count.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep5CountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep5CountPageRoutingModule {}
