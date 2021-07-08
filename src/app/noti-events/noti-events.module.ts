import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotiEventsPageRoutingModule } from './noti-events-routing.module';

import { NotiEventsPage } from './noti-events.page';
import { AccordionListComponent } from '../components/accordion-list/accordion-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotiEventsPageRoutingModule
  ],
  declarations: [NotiEventsPage, AccordionListComponent]
})
export class NotiEventsPageModule {}
