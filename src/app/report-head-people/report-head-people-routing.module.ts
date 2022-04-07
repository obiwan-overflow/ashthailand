import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportHeadPeoplePage } from './report-head-people.page';

const routes: Routes = [
  {
    path: '',
    component: ReportHeadPeoplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportHeadPeoplePageRoutingModule {}
