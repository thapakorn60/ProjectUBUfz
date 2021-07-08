import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinerEventPage } from './joiner-event.page';

const routes: Routes = [
  {
    path: '',
    component: JoinerEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinerEventPageRoutingModule {}
