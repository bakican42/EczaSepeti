import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './site/auth/auth.component';
import { SiteComponent } from './site/site.component';
import { HomeComponent } from './site/home/home.component';
import { OrderComponent } from './site/order/order.component';
import { SigninCustomerComponent } from './site/auth/signin/signin-customer.component';
import { SignupCustomerComponent } from './site/auth/signup/signup-customer.component';
import { HeaderComponent } from './site/components/header/header.component';
import { FooterComponent } from './site/components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AnonymousGuard } from './guards/anonymous.guard';
import { ServiceGuard } from './guards/service.guard';
import { AdminGuard } from './guards/admin.guard';
import { CustomerGuard } from './guards/customer.guard';
import { SharedModule } from './shared/shared.module';
import { AlertifyService } from './services/alertify.service';
import { SigninPharmacyComponent } from './site/auth/signin/signin-pharmacy.component';
import { SingupPharmacyComponent } from './site/auth/signup/signup-pharmacy.component';
import { AuthAdminComponent } from './site/auth/auth-admin.component';
import { SigninAdminComponent } from './site/auth/signin/signin-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthAdminComponent,
    SiteComponent,
    HomeComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    SigninCustomerComponent,
    SignupCustomerComponent,
    SigninPharmacyComponent,
    SingupPharmacyComponent,
    SigninAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    AuthService,
    UserService,
    AnonymousGuard,
    ServiceGuard,
    AdminGuard,
    CustomerGuard,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
