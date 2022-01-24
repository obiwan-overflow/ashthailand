import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCompletePage } from './form-complete.page';

const routes: Routes = [
  {
    path: '',
    component: FormCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCompletePageRoutingModule {}
