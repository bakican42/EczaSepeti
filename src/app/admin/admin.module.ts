import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GraphicComponent } from "./dashboard/graphic.component";
import { SummaryComponent } from "./dashboard/summary.component";
import { NavbarProfileComponent } from "./components/navbar/profile.component";
import { SharedModule } from "../shared/shared.module";
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyListComponent } from './pharmacy/list/pharmacy-list.component';

@NgModule({
    declarations: [
        AdminComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        DashboardComponent,
        GraphicComponent,
        SummaryComponent,
        NavbarProfileComponent,
        PharmacyComponent,
        PharmacyListComponent
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        SharedModule
    ],
    exports: []
})
export class AdminModule { }