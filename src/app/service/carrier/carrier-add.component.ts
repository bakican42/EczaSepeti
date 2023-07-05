import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/services/alertify.service";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-service-carrier-add',
    templateUrl: './carrier-add.component.html',
    styles: [],
    providers: [ApiService]
})
export class CarrierAddComponent implements OnInit {

    public formGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    })

    constructor(
        public router: Router,
        private authService: AuthService,
        private apiService: ApiService,
        private alertifyService: AlertifyService
    ) {}

    ngOnInit(): void {
        
    }

    formSubmit() {
        if (this.formGroup.valid) {
            const carrierDataRegister = {
                name: this.formGroup.value.name,
                surname: this.formGroup.value.surname,
                mobile: this.formGroup.value.mobile,
                job: "kurye",
                title: "Kurye",
                email: this.formGroup.value.email,
                password: this.formGroup.value.password
            }
            // add carrier
            this.apiService.postCarrierAdd(carrierDataRegister).subscribe(response => {
                console.log(response)
                if (response.data) {
                    this.alertifyService.success("Kayıt Başarılı");
                    this.router.navigateByUrl('/service/carrier/list');
                } else {
                    this.alertifyService.error("Kayıt Başarısız")
                }
                
            })
        } else {
            this.alertifyService.error("Hatalı Form, Lütfen Tüm Bilgileri Doldurunuz");
        }
    }
}