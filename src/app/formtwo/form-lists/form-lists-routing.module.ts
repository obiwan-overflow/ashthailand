import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormListsPage } from './form-lists.page';

const routes: Routes = [
  {
    path: '',
    component: FormListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormListsPageRoutingModule {}
