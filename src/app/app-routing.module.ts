import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuardService} from "./auth-guard.service";

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Hubregator - Sign In'}},
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Hubregator Dashboard'}, canActivate: [AuthGuardService]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
