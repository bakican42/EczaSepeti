import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyListComponent } from './pharmacy/list/pharmacy-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      {
        path: 'pharmacy',
        component: PharmacyComponent,
        data: { breadcrumb: 'Eczaneler', name: 'PharmacyComponent' },
        children: [
          {
            path: 'list',
            component: PharmacyListComponent,
            data: { breadcrumb: 'Liste', name: 'PharmacyListComponent' },
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
