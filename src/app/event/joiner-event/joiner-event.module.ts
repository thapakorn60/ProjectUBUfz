import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinerEventPageRoutingModule } from './joiner-event-routing.module';

import { JoinerEventPage } from './joiner-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinerEventPageRoutingModule
  ],
  declarations: [JoinerEventPage]
})
export class JoinerEventPageModule {}
