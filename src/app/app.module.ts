import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AccountService } from './services/account.service';
import { LoadingService } from './services/loading.service';
import { QuizService } from './services/quiz.service';
import { AlertService } from './services/alert.service';
import { QuizresolverService } from './services/quizresolver.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoute : Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'resetpassword', component: ResetPasswordComponent},
  {path: 'home', component: HomeComponent, canActivate:[AuthenticationGuard]},
  {path: 'quizdetails/:id', component: QuizDetailsComponent},
  {path: '', redirectTo:'/home', pathMatch:'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    LoginComponent,
    ResetPasswordComponent,
    ProfileComponent,
    QuizDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
  ],
  providers: [
    AccountService,
    LoadingService,
    QuizService,
    AlertService,
    QuizresolverService,
    AuthenticationGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
