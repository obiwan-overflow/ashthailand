import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportHeadPeopleTypePage } from './report-head-people-type.page';

const routes: Routes = [
  {
    path: '',
    component: ReportHeadPeopleTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportHeadPeopleTypePageRoutingModule {}
