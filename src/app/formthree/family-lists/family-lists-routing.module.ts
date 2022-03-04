import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyListsPage } from './family-lists.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyListsPageRoutingModule {}
