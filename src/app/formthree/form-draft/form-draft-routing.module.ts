import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDraftPage } from './form-draft.page';

const routes: Routes = [
  {
    path: '',
    component: FormDraftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormDraftPageRoutingModule {}
