import { NgModule } from "@angular/core";
import { ServiceRoutingModule } from "./service-routing.module";
import { ServiceComponent } from "./service.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GraphicComponent } from "./dashboard/graphic.component";
import { SummaryComponent } from './dashboard/summary.component';
import { NavbarProfileComponent } from "./components/navbar/profile.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { OrdersComponent } from "./orders/orders.component";
import { CarrierComponent } from "./carrier/carrier.component";
import { CarrierAddComponent } from "./carrier/carrier-add.component";
import { CarrierListComponent } from "./carrier/carrier-list.component";
import { OrdersDetailComponent } from "./orders/order-detail.component";
import { MedicineComponent } from './medicine/medicine.component';
import { NonPrescriptionComponent } from "./medicine/non-prescription/non-prescription.component";
import { NonPrescriptionListComponent } from "./medicine/non-prescription/list/non-prescription-list.component";
import { NonPrescriptionAddComponent } from "./medicine/non-prescription/add/non-prescription-add.component";
import { PrescriptionComponent } from "./medicine/prescription/prescription.component";
import { PrescriptionListComponent } from "./medicine/prescription/list/prescription-list.component";
import { PrescriptionAddComponent } from "./medicine/prescription/add/prescription-add.component";

@NgModule({
    declarations: [
        ServiceComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        DashboardComponent,
        GraphicComponent,
        SummaryComponent,
        NavbarProfileComponent,
        OrdersComponent,
        OrdersDetailComponent,
        CarrierComponent,
        CarrierAddComponent,
        CarrierListComponent,
        MedicineComponent,
        PrescriptionComponent,
        PrescriptionListComponent,
        PrescriptionAddComponent,
        NonPrescriptionComponent,
        NonPrescriptionAddComponent,
        NonPrescriptionListComponent,
    ],
    imports: [
        ServiceRoutingModule,
        CommonModule,
        SharedModule
    ],
    exports: []
})
export class ServiceModule {}