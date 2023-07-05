import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/services/alertify.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-signin-admin',
    templateUrl: './signin-admin.component.html',
    styleUrls: []
})
export class SigninAdminComponent implements OnInit {

    @Output() login = new EventEmitter<boolean>()

    private _loading: boolean = false;
    public get loading(): boolean {
        return this._loading;
    }
    public set loading(value: boolean) {
        this._loading = value;
    }
    public error: string | undefined;
    public emailExists: boolean = false;

    constructor(
        public router: Router,
        private authService: AuthService,
        private alertifyService: AlertifyService
    ) { }

    authFormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    ngOnInit(): void { }

    authFormSubmit() {
        if (this.authFormGroup.valid) {
            const adminDataLogin = {
                email: this.authFormGroup.value.email,
                password: this.authFormGroup.value.password
            }
            // login
            this.authService.apiAdminLogin(adminDataLogin).subscribe(response => {
                if (response.success) {
                    this.alertifyService.success("Giriş Başarılı")
                    window.location.href = this.authService.userRole
                } else {
                    this.alertifyService.error("Giriş Başarısız")
                }
            })
        } else {
            this.alertifyService.error("Hatalı Form, Lütfen Tüm Bilgileri Doldurunuz")
        }
    }
}