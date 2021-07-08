import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AuthFormSignupComponent } from '../components/auth-form-signup/auth-form-signup.component';




@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [AuthFormSignupComponent],
  exports: [AuthFormSignupComponent],
  entryComponents: [AuthFormSignupComponent]
})
export class AuthModule {}
