import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep3bPage } from './form-step3b.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep3bPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep3bPageRoutingModule {}
