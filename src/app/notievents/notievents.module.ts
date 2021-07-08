import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotieventsPageRoutingModule } from './notievents-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotieventsPage } from './notievents.page';
import { AccordionListComponent } from '../components/accordion-list/accordion-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotieventsPageRoutingModule
  ],
  declarations: [NotieventsPage, AccordionListComponent]
})
export class NotieventsPageModule {}
