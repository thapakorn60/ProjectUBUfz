import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotieventsPage } from './notievents.page';

const routes: Routes = [
  {
    path: '',
    component: NotieventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotieventsPageRoutingModule {}
