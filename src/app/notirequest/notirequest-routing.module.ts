import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotirequestPage } from './notirequest.page';

const routes: Routes = [
  {
    path: '',
    component: NotirequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotirequestPageRoutingModule {}
