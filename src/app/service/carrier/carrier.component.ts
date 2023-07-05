import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-service-carrier',
    templateUrl : './carrier.component.html',
    styles: [],
    providers: []
})
export class CarrierComponent implements OnInit{

    constructor(
        public router: Router,
        private authService: AuthService
    ) {}
    
    ngOnInit(): void {
        
    }
}