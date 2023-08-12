import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DummyComponent } from './dummy/dummy.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'', component:RegisterComponent},
  {path :'dashboard',component: DashboardComponent},
  {path : 'login',component: LoginComponent},
  {path : 'profile',component: ProfileComponent},
  {path: 'forgotpwd', component: ForgotpasswordComponent},
  {path: 'editprofile',component: EditprofileComponent},
  {path : 'users',component: UsersComponent},
  {path : 'dummy',component: DummyComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
