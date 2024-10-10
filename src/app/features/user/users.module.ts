import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Adm004Component } from './adm004/adm004.component';

@NgModule({
  declarations: [
    UserListComponent,
    Adm004Component,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BsDatepickerConfig]
})
export class UsersModule { }
