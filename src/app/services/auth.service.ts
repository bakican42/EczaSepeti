import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {

    private baseUrl: string = environment.laravelApiEndpoint
    public isUserLogin: boolean = false
    public isPharmacyLogin: boolean = false
    public isAdminLogin: boolean = false
    public userRole: string = ""
    public returnedToken: any;
    public currentUser = {
        name: "",
        surname: "",
        email: "",
        img: "assets/img/not-found.png",
        is_admin: false,
        company_id: 0,
        identity_no: 0,
        sidebarShrink: false,
        permission_profile_id: 0
    }

    constructor(
        private http: HttpClient
    ) { 
        this.userLogin();
        this.pharmacyLogin();
        this.adminLogin();
    }
    

    apiUserRegister(userDataRegister: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + "user/register", userDataRegister).pipe(map(response => {
            return response;
        }))
    }

    apiPharmacyRegister(pharmacyDataRegister: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + "pharmacy/register", pharmacyDataRegister).pipe(map(response => {
            return response;
        }))
    }

    apiAdminRegister(adminDataRegister: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + "admin/register", adminDataRegister).pipe(map(response => {
            return response;
        }))
    }

    apiUserLogin(userDataLogin: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + "user/login", userDataLogin).pipe(map(response => {
            if (response.success) {
                localStorage.setItem('access_token', response.data.token)
                this.userLogin();
            }
            return response;
        }))
    }

    apiPharmacyLogin(pharmacyDataLogin: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + "pharmacy/login", pharmacyDataLogin).pipe(map(response => {
            if (response.success) {
                localStorage.setItem('access_token', response.data.token)
                this.pharmacyLogin();
            }
            return response;
        }))
    }

    apiAdminLogin(adminDataLogin: any): Observable<any> {
        return this.http.post<any>(this.baseUrl + "admin/login", adminDataLogin).pipe(map(response => {
            if (response.success) {
                localStorage.setItem('access_token', response.data.token)
                this.adminLogin();
            }
            return response;
        }))
    }
        
    logout(): void {
        localStorage.removeItem('access_token');
        this.isUserLogin = false;
        this.isPharmacyLogin = false;
    }

    userLogin(): void {
        const token = this.getUserToken(true)
        if (token) {
            this.isUserLogin = true;
            this.userRole = "customer";
        } else {
            this.logout()
        }
    }

    pharmacyLogin(): void {
        const token = this.getUserToken(true)
        if (token) {
            this.isPharmacyLogin = true;
            this.userRole = "service";
        } else {
            this.logout()
        }
    }

    adminLogin(): void {
        const token = this.getUserToken(true)
        if (token) {
            this.isAdminLogin = true;
            this.userRole = "admin";
        } else {
            this.logout()
        }
    }

    getUserToken(parse: boolean, bearerToken?: string) {
        let token = bearerToken ? bearerToken : localStorage.getItem('access_token')
        if (token) {
            if (!parse) return token
            return token
        } else {
            return false
        }
    }

    setUser() {
        
    }
}