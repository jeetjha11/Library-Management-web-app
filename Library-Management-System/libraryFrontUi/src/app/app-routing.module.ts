import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDisplayComponent } from './admin-display/admin-display.component';
import { IssuedBookComponent } from './issued-book/issued-book.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './service/guard/auth.guard';
import { CanDeactivateService } from './service/guard/can-deactivate.service';
import { UserLandingComponent } from './user-landing/user-landing.component';

const routes: Routes = [
  {
    path:'user',
    canActivate:[AuthGuard],
    component: UserLandingComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'registration',
    canDeactivate:[CanDeactivateService],
    component: RegistrationComponent
  },
  {
    path:'admin',
    canActivate:[AuthGuard],
    component: AdminDisplayComponent
  },
  {
    path:'issuebook',
    component: IssuedBookComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
