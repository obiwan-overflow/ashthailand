import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormResponsePage } from './form-response.page';

const routes: Routes = [
  {
    path: '',
    component: FormResponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormResponsePageRoutingModule {}
