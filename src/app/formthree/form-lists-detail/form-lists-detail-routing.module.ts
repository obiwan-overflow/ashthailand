import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormListsDetailPage } from './form-lists-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FormListsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormListsDetailPageRoutingModule {}
