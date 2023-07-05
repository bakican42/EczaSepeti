import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-auth-admin',
    templateUrl: './auth-admin.component.html',
    styleUrls: []
})
export class AuthAdminComponent implements OnInit {

    public authTab: String = "login"

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService
    ) { }

    ngOnInit(): void { }

    authTabChange(tab: String) {
        this.authTab = tab
    }
}