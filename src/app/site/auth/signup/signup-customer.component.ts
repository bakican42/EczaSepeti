import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-customer',
  templateUrl: './signup-customer.component.html',
  styleUrls: []
})
export class SignupCustomerComponent implements OnInit {

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
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      TC_no: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }
  )

  ngOnInit(): void { }

  authFormSubmit() {
    if (this.authFormGroup.valid) {
      const userDataRegister = {
        name: this.authFormGroup.value.name,
        surname: this.authFormGroup.value.surname,
        email: this.authFormGroup.value.email,
        mobile: this.authFormGroup.value.mobile,
        TC_no: this.authFormGroup.value.TC_no,
        password: this.authFormGroup.value.password
      }
      // register
      this.authService.apiUserRegister(userDataRegister).subscribe(response => {
        console.log(response)
        if (response.success) {
          this.alertifyService.success("Kayıt Başarılı")
          window.location.href = this.router.url
        } else {
          this.alertifyService.error("Kayıt Başarısız")
        }
      })
    } else {
      this.alertifyService.error("Hatalı Form, Lütfen Tüm Bilgileri Doldurunuz");
    }
  }

}
