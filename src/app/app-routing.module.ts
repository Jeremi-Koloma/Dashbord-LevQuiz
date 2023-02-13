import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { PrincipalComponent } from './principal/principal.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },


    { path: '', component: PrincipalComponent,
     children: [
    { path: 'dashboard', component: DashboardComponent },

  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
