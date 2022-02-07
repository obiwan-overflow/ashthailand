import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportHeadPage } from './report-head.page';

const routes: Routes = [
  {
    path: '',
    component: ReportHeadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportHeadPageRoutingModule {}
