
// En este archivo configuramos las rutas de nuestro proyecto, parece simple i con poco codigo pero esto
// se debe a que hemos implementado nuestras propias rutas en otros modulos para permitir asi
// un orden en nuestro programa i simplificar nuestro codigo.

import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'progress', component: ProgressComponent},
      { path: 'graficas1', component: Graficas1Component},
      { path: 'account-settings', component: AccountSettingsComponent},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
