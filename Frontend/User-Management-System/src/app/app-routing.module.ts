import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { StatusComponent } from './pages/status/status.component';
import { TaskComponent } from './pages/task/task.component';
import { ContactComponent } from './Components/contact/contact.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { UserGuard } from './guard/user.guard';
import { UserTaskComponent } from './pages/user-task/user-task.component';
import { UserComponent } from './modules/user/user.component';
import { SubscriptionsComponent } from './modules/subscriptions/subscriptions.component';
import { ViewUserComponent } from './modules/view-user/view-user.component';
import { AddUserComponent } from './modules/add-user/add-user.component';
import { WallboardComponent } from './modules/wallboard/wallboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "dashboard", component: DashboardComponent, canActivate:[AuthGuard],
    children: [
      { path: "users", component: UserComponent },
      { path: "addUser", component: AddUserComponent },
      { path: "view-user", component: ViewUserComponent },
      { path: "subscriptions", component: SubscriptionsComponent },
      { path: "wallboard", component: WallboardComponent },

      { path: "contact", component: ContactComponent },
      { path: "task", component: TaskComponent },
      { path: "status", component: StatusComponent },
      { path: "profile", component: UpdateProfileComponent },
      { path: "user-task", component: UserTaskComponent },
    ]
  },

  { path: "email-verification", component: EmailVerificationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
