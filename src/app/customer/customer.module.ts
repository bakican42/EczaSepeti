import { NgModule } from "@angular/core";
import { CustomerComponent } from "./customer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarProfileComponent } from "./components/navbar/profile/profile.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CustomerRoutingModule } from "./customer-routing.module";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order/list/order-list.component';
import { OrderDetailComponent } from './order/detail/order-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';

@NgModule({
    declarations: [
        CustomerComponent,
        NavbarComponent,
        FooterComponent,
        NavbarProfileComponent,
        DashboardComponent,
        OrderComponent,
        OrderListComponent,
        OrderDetailComponent,
        ProfileComponent,
        ProfileDetailComponent,

    ],
    imports: [
        CustomerRoutingModule,
        CommonModule,
        SharedModule
    ],
    exports: []
})
export class CustomerModule { }