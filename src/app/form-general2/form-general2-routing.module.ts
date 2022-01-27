import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormGeneral2Page } from './form-general2.page';

const routes: Routes = [
  {
    path: '',
    component: FormGeneral2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormGeneral2PageRoutingModule {}
