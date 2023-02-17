import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprenantsComponent } from './apprenants/apprenants.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormateursComponent } from './formateurs/formateurs.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard]},
      { path: 'apprenants', component: ApprenantsComponent, canActivate: [AuthenticationGuard]},
      { path: 'formateurs', component: FormateursComponent, canActivate: [AuthenticationGuard]},
      { path: 'quizlist', component: QuizComponent, canActivate: [AuthenticationGuard]},
    ],
  },

  { path: 'login', component: LoginComponent},
  { path: 'resetpassword', component: ResetPasswordComponent},
  { path: 'quizdetails/:id', component: QuizDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
