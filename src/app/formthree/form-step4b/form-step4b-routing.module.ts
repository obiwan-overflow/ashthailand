import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormStep4bPage } from './form-step4b.page';

const routes: Routes = [
  {
    path: '',
    component: FormStep4bPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStep4bPageRoutingModule {}
