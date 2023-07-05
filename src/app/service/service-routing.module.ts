import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders/orders.component';
import { CarrierComponent } from './carrier/carrier.component';
import { CarrierAddComponent } from './carrier/carrier-add.component';
import { CarrierListComponent } from './carrier/carrier-list.component';
import { OrdersDetailComponent } from './orders/order-detail.component';
import { MedicineComponent } from './medicine/medicine.component';
import { PrescriptionComponent } from './medicine/prescription/prescription.component';
import { PrescriptionListComponent } from './medicine/prescription/list/prescription-list.component';
import { PrescriptionAddComponent } from './medicine/prescription/add/prescription-add.component';
import { NonPrescriptionAddComponent } from './medicine/non-prescription/add/non-prescription-add.component';
import { NonPrescriptionListComponent } from './medicine/non-prescription/list/non-prescription-list.component';
import { NonPrescriptionComponent } from './medicine/non-prescription/non-prescription.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { breadcrumb: 'Anasayfa', name: 'DashboardComponent' },
        pathMatch: 'full',
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { breadcrumb: 'Siparişler', name: 'OrdersComponent' },
      },
      {
        path: 'order/:id',
        component: OrdersDetailComponent,
        data: { breadcrumb: 'Sipariş Detayı', name: 'OrdersDetailComponent' },
      },
      {
        path: 'carrier',
        component: CarrierComponent,
        data: { breadcrumb: 'Kuryeler', name: 'CarrierComponent' },
        children: [
          {
            path: 'add',
            component: CarrierAddComponent,
            data: { breadcrumb: 'Ekle', name: 'CarrierAddComponent' },
          },
          {
            path: 'list',
            component: CarrierListComponent,
            data: { breadcrumb: 'Liste', name: 'CarrierListComponent' },
          },
        ],
      },
      {
        path: 'medicine',
        component: MedicineComponent,
        data: { breadcrumb: 'İlaçlar', name: 'MedicineComponent' },
        children: [
          {
            path: 'prescription',
            component: PrescriptionComponent,
            data: { breadcrumb: 'Reçeteli İlaçlar', name: 'PrescriptionComponent' },
            children: [
              {
                path: 'list',
                component: PrescriptionListComponent,
                data: { breadcrumb: 'İlaçlar', name: 'PrescriptionListComponent' },
              },
              {
                path: 'add',
                component: PrescriptionAddComponent,
                data: { breadcrumb: 'Ekle', name: 'PrescriptionAddComponent' },
              }
            ]
          },
          {
            path: 'non-prescription',
            component: NonPrescriptionComponent,
            data: { breadcrumb: 'Reçetesiz İlaçlar', name: 'NonPrescriptionComponent' },
            children: [
              {
                path: 'list',
                component: NonPrescriptionListComponent,
                data: { breadcrumb: 'İlaçlar', name: 'NonPrescriptionListComponent' },
              },
              {
                path: 'add',
                component: NonPrescriptionAddComponent,
                data: { breadcrumb: 'Ekle', name: 'NonPrescriptionAddComponent' },
              },
            ]
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
export class ServiceRoutingModule {}
