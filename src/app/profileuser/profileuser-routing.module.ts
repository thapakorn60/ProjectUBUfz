import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileuserPage } from './profileuser.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileuserPageRoutingModule {}
