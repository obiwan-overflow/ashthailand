import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormGeneralPage } from './form-general.page';

const routes: Routes = [
  {
    path: '',
    component: FormGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormGeneralPageRoutingModule {}
