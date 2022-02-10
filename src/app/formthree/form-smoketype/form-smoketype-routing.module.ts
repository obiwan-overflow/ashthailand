import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormSmoketypePage } from './form-smoketype.page';

const routes: Routes = [
  {
    path: '',
    component: FormSmoketypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormSmoketypePageRoutingModule {}
