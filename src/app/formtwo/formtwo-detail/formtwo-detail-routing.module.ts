import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormtwoDetailPage } from './formtwo-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FormtwoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormtwoDetailPageRoutingModule {}
