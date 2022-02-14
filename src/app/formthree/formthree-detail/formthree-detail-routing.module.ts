import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormthreeDetailPage } from './formthree-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FormthreeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormthreeDetailPageRoutingModule {}
