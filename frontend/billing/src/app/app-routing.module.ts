import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginEditComponent,LoginListComponent } from './login-edit/login-edit.component';

const routes: Routes = [
{path: 'login/list', component: LoginListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
