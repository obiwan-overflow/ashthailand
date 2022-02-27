import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormFamilyListsPage } from './form-family-lists.page';

const routes: Routes = [
  {
    path: '',
    component: FormFamilyListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormFamilyListsPageRoutingModule {}
