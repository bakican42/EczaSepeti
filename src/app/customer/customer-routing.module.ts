import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderListComponent } from './order/list/order-list.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order/detail/order-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      {
        path: 'order',
        component: OrderComponent,
        data: { breadcrumb: 'Siparişler', name: 'OrderComponent' },
        children: [
          {
            path: 'list',
            component: OrderListComponent,
            data: { breadcrumb: 'Liste', name: 'OrderListComponent' },
          },
          {
            path: ':id',
            component: OrderDetailComponent,
            data: { breadcrumb: 'Detay', name: 'OrderDetailComponent' },
          },
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { breadcrumb: 'Profil', name: 'ProfileComponent' },
        children: [
          {
            path: 'detail',
            component: ProfileDetailComponent,
            data: { breadcrumb: 'Detay', name: 'ProfileDetailComponent' },
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
export class CustomerRoutingModule {}
