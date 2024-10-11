import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemErrorComponent } from 'src/app/shared/component/error/system-error.component';
import { UserListComponent } from './list/user-list.component';
import { AuthorizeGuard } from '../../shared/auth/authorize.guard';
import { Adm004Component } from './adm004/adm004.component';
import { Adm005Component } from './adm005/adm005.component';

const routes: Routes = [
  { path: 'user', redirectTo: 'user/list', pathMatch: 'full'},
  { path: 'user/list', component: UserListComponent, canActivate: [AuthorizeGuard] },
  { path: 'user/adm004', component: Adm004Component, canActivate: [AuthorizeGuard] },
  { path: 'user/adm004/:id', component: Adm004Component, canActivate: [AuthorizeGuard] },
  { path: 'user/adm005', component: Adm005Component, canActivate: [AuthorizeGuard] },
  { path: '**', component: SystemErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
