// External Modules.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// My Components.
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { PasswordComponent } from './components/user/password/password.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';

// My Guards.
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/password', component: PasswordComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
