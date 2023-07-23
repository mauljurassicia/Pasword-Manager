import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SiteListComponent } from './site-list/site-list.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { pageGuardGuard } from './page-guard.guard';

const routes: Routes = [
  { path: "", component: LoginComponent},
  { path: "signup", component: LoginComponent},
  { path: "site-list", component: SiteListComponent, canActivate: [pageGuardGuard] },
  { path: "password-list", component: PasswordListComponent, canActivate: [pageGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
