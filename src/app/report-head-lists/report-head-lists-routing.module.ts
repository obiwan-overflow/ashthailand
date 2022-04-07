import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportHeadListsPage } from './report-head-lists.page';

const routes: Routes = [
  {
    path: '',
    component: ReportHeadListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportHeadListsPageRoutingModule {}
