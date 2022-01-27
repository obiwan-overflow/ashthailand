import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTwo2Page } from './form-two2.page';

const routes: Routes = [
  {
    path: '',
    component: FormTwo2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTwo2PageRoutingModule {}
