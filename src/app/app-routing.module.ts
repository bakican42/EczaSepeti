import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './site/auth/auth.component';
import { SiteComponent } from './site/site.component';
import { HomeComponent } from './site/home/home.component';
import { ServiceGuard } from './guards/service.guard';
import { CustomerGuard } from './guards/customer.guard';
import { AdminGuard } from './guards/admin.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthAdminComponent } from './site/auth/auth-admin.component';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  { path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule)},
  { path: 'auth', component: AuthComponent},
  { path: 'auth/admin', component: AuthAdminComponent},
  {
    path: '', component: SiteComponent, canActivate: [AnonymousGuard], children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
