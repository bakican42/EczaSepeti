import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    // get user
    get get() {
        return this.authService.currentUser
    }

    // set user
    setUser() {
        this.authService.setUser()
    }
}