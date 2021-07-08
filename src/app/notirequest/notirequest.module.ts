import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotirequestPageRoutingModule } from './notirequest-routing.module';

import { NotirequestPage } from './notirequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotirequestPageRoutingModule
  ],
  declarations: [NotirequestPage]
})
export class NotirequestPageModule {}
