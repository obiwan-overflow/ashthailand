import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportAdmintwoPage } from './report-admintwo.page';

const routes: Routes = [
  {
    path: '',
    component: ReportAdmintwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportAdmintwoPageRoutingModule {}
