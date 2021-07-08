import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotiEventsPage } from './noti-events.page';

const routes: Routes = [
  {
    path: '',
    component: NotiEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotiEventsPageRoutingModule {}
