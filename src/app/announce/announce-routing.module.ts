import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnnouncePage } from './announce.page';

const routes: Routes = [
  {
    path: '',
    component: AnnouncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnouncePageRoutingModule {}
