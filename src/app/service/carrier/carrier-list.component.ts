import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/services/alertify.service";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-service-carrier-list',
    templateUrl: './carrier-list.component.html',
    styles: [],
    providers: [ApiService]
})
export class CarrierListComponent implements OnInit {

    public carrierList: any[] = []
    constructor(
        private router: Router,
        private authService: AuthService,
        private apiService: ApiService,
        private alertifyService: AlertifyService
    ) {}

    ngOnInit(): void {
        this.apiService.getCarrierList().subscribe(response => {
            console.log(response)
            if (response.data) {
                this.carrierList = response.data
            }
        })
    }
}