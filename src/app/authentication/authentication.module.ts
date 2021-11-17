import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterUserComponent },
    ])
  ]
})
export class AuthenticationModule { }
