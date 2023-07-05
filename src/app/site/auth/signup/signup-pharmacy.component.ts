import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, FormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/services/alertify.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-signup-pharmacy',
    templateUrl: './signup-pharmacy.component.html',
    styleUrls: []
})
export class SingupPharmacyComponent implements OnInit {

    @Output() login = new EventEmitter<boolean>()

    constructor(
        public router: Router,
        private authService: AuthService,
        private alertifyService: AlertifyService
    ) { }

    public authFormGroup = new FormGroup(
        {
          name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
          surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
          mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
          organization_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
          city: new FormControl('', [Validators.required]),
          district: new FormControl('', [Validators.required]),
          address:  new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        }
      )

    ngOnInit(): void { }
    
    authFormSubmit() {
        if (this.authFormGroup.valid) {
          const pharmacyDataRegister = {
            name: this.authFormGroup.value.name,
            surname: this.authFormGroup.value.surname,          
            mobile: this.authFormGroup.value.mobile,
            organization_name: this.authFormGroup.value.organization_name,
            job: "eczaci",
            title: "Baş Eczacı",
            city: this.authFormGroup.value.city,
            district: this.authFormGroup.value.district,
            address: this.authFormGroup.value.address,
            email: this.authFormGroup.value.email,
            password: this.authFormGroup.value.password
          }
          // registe6
          this.authService.apiUserRegister(pharmacyDataRegister).subscribe(response => {
            console.log(response)
            if (response.success) {
              this.alertifyService.success("Kayıt Başarılı")
              if (this.router.url == '/') {
                this.login.emit(true)
              } else {
                window.location.href = "service"
              }
            } else {
              this.alertifyService.error("Kayıt Başarısız")
            }
          })
        } else {
          this.alertifyService.error("Hatalı Form, Lütfen Tüm Bilgileri Doldurunuz");
        }
      }
    
}