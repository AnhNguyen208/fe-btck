import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Adm004Component } from './adm004/adm004.component';
import { Adm005Component } from './adm005/adm005.component';
import { Adm006Component } from './adm006/adm006.component';

@NgModule({
  declarations: [
    UserListComponent,
    Adm004Component,
    Adm005Component,
    Adm006Component,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [BsDatepickerConfig, 
    DatePipe
  ]
})
export class UsersModule { }
