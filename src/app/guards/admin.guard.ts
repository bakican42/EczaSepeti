import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (this.isLogin() && this.isAdmin()) {
            return true;
        } else {
            return false;
        }
    }

    isLogin(): boolean {
        return this.authService.isAdminLogin;
    }

    isAdmin(): boolean {
        return this.authService.userRole === "admin";
    }
}