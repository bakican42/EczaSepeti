import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { AlertifyService } from "../services/alertify.service";

@Injectable()
export class CustomerGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private alertifyService: AlertifyService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (this.isLogin() && this.isCustomer()) {
            return true;
        } else {
            return false;
        }    
    }

    isLogin(): boolean {
        return this.authService.isUserLogin;
    }

    isCustomer(): boolean {
        return this.authService.userRole === "customer";
    }
}