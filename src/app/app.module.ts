import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CacheInterceptor } from './interceptor/cache.interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AccountService } from './services/account.service';
import { LoadingService } from './services/loading.service';
import { QuizService } from './services/quiz.service';
import { AlertService } from './services/alert.service';
import { QuizresolverService } from './services/quizresolver.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApprenantsComponent } from './apprenants/apprenants.component';
import { FormateursComponent } from './formateurs/formateurs.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { QuizComponent } from './quiz/quiz.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    PrincipalComponent,
    LoginComponent,
    ResetPasswordComponent,
    QuizDetailsComponent,
    ApprenantsComponent,
    FormateursComponent,
    QuizComponent,
    ProfileComponent
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
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    NgConfirmModule,
  ],
  providers: [
    AccountService,
    LoadingService,
    QuizService,
    AlertService,
    QuizresolverService,
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
