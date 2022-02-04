import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormoneDetailPage } from './formone-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FormoneDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormoneDetailPageRoutingModule {}
