import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OrderResponse } from "../service/orders/orders_model";
import { OrderDetail } from "../service/orders/order_detail_model";
import { CourierResponse } from "../service/orders/couriers_model";
import { CategoryResponse, SubCategoryResponse } from "../service/medicine/models/categories-model";
import { Medicine, MedicineListResponse } from "../service/medicine/models/medicine-model";
import { NonMedicineListResponse } from "../service/medicine/models/non-medicine-model";
import { PharmacyResponse } from "../admin/pharmacy/models/pharmacy-model";
import { CustomerOrderResponse } from "../customer/order/models/order-model";
import { CustomerOrderDetailResponse } from "../customer/order/models/order-detail";
import { UserProfileResponse } from "../customer/profile/models/profile-model";

@Injectable()
export class ApiService {

    private baseUrl: string = environment.laravelApiEndpoint
    private options = {
        headers: new HttpHeaders({
            'Authorization': "",
        })
    }

    constructor(
        private http: HttpClient
    ) {}

    setToken() {
        const token = localStorage.getItem('access_token')
        if (token) {
          if (this.options.headers.has('Authorization')) {
            this.options.headers = this.options.headers.set('Authorization',"Bearer " + token)
          } else {
            this.options.headers = this.options.headers.append('Authorization', "Bearer " + token)
          }
        }
      }
    

    // Pharmacy İşlemleri

    getMedicineCategory(): Observable<any> {
        this.setToken()
        return this.http.get<any>(this.baseUrl + "pharmacy/medicine/category", this.options)
    }

    postCarrierAdd(carrierDataRegister: any): Observable<any> {
      this.setToken()
      return this.http.post<any>(this.baseUrl + "pharmacy/add_carrier", carrierDataRegister, this.options)
    }

    getCarrierList(): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + "pharmacy/list/courriers", this.options)
    }

    // User İşlemleri

    // il
    getCities(): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + "user/location/city", this.options)
    }

    // ilçe
    getDistrict(): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + "user/location/district", this.options)
    }

    // mahalle
    getTown(): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + "user/location/address", this.options)
    }

    // reçeteler
    getPrescription(): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + "user/list/prescription", this.options)
    }

    // reçeteye uygun eczaneler
    getPrescriptionPharmacy(town_name: string, code: string): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `user/medicine/prescription/pharmacies/${town_name}/${code}`, this.options)
    }

    // reçete detay
    getPrescriptionDetail(pharmacy_id: number, code: string): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `user/medicine/prescription/${pharmacy_id}/${code}`, this.options)
    }
    
    // eczane list
    getPharmacyList(town_name: string): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `user/list/pharmacy/${town_name}`, this.options)
    }
    // reçetesiz ilaçlar search
    getMedicineSearch(pharmacy_id: number, medicine_name: string):Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `user/medicine/search/${pharmacy_id}/?search=${medicine_name}`, this.options)
    }
    // reçetesiz ilaç olmayan kategori
    getNonMedicineCategory(pharmacy_id: number): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `user/list/category/${pharmacy_id}`, this.options)
    }
    // reçetesiz ilaç olmayan alt kategori
    getNonMedicineSubCategory(category_id: number): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `user/list/sub_category/${category_id}`, this.options)
    }
    // reçetesiz ilaç olmayan ilaçlar
    getNonMedicine(pharmacy_id: number, sub_category_id: number): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `user/list/non_medicine/${sub_category_id}/${pharmacy_id}`, this.options)
    }

    // reçetesiz ilaç olmayan ilaçlar tamamı
    getNonMedicines(pharmacy_id: number): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `user/list/non_medicines/${pharmacy_id}`, this.options)
    }

    // reçeteli sepete ekleme
    prescriptionAddBasket(addData: any): Observable<any> {
      this.setToken()
      return this.http.post<any>(this.baseUrl + "user/shopping/add", addData, this.options)
    }

    // reçetesiz sepete ekleme
    nonPrescriptionAddBasket(addData: any): Observable<any> {
      this.setToken()
      return this.http.post<any>(this.baseUrl + "user/shopping/add", addData, this.options)
    }

    // sepet içeriği getirme
    getBasket(): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + "user/shopping/basket", this.options)
    }

    // satın alma
    buyBasket(basket_id: number, buyData: any): Observable<any> {
      this.setToken()
      return this.http.post<any>(this.baseUrl + `user/shopping/buy/${basket_id}`, buyData, this.options)
    }

    // eczaneye gelmiş tüm siparişleri getir
    getPharmacyOrders(): Observable<OrderResponse> {
      this.setToken()
      return this.http.get<OrderResponse>(this.baseUrl + `pharmacy/order/list`, this.options)
    }

    // eczane sipariş detayı getir
    getPharmacyOrderDetail(order_id: number): Observable<OrderDetail> {
      this.setToken()
      return this.http.get<OrderDetail>(this.baseUrl + `pharmacy/order/${order_id}`, this.options)
    }

    // sipariş statü güncelle
    updateOrderStatus(order_id: number, status: String, carrier_id: number | null, canceled_cause: String | undefined): Observable<any> {
      this.setToken()
      return this.http.post<any>(this.baseUrl + `pharmacy/order/update/${order_id}`, {
        "status": status,
        ...(carrier_id !== null && { carrier_id: carrier_id }),
        ...(canceled_cause !== undefined && { canceled_cause: canceled_cause })
      }, this.options)
    }

    //kurye listesi getir
    getCourierList(): Observable<CourierResponse> {
      this.setToken()
      return this.http.get<CourierResponse>(this.baseUrl + `pharmacy/list/courriers`, this.options)
    }

    //Service panel Medicine kategori listesi
    getMedicineCategories(): Observable<CategoryResponse> {
      this.setToken()
      return this.http.get<CategoryResponse>(this.baseUrl + `pharmacy/medicine/category`, this.options)
    }

    //Service panel Medicine kategori listesi
    getMedicineSubCategories(category_id: number): Observable<SubCategoryResponse> {
      this.setToken()
      return this.http.get<SubCategoryResponse>(this.baseUrl + `pharmacy/medicine/sub_category/${category_id}`, this.options)
    }

    //Service panel Medicine kategori listesi
    getNonMedicineCategories(): Observable<CategoryResponse> {
      this.setToken()
      return this.http.get<CategoryResponse>(this.baseUrl + `pharmacy/non_medical/category`, this.options)
    }

    //Service panel Medicine kategori listesi
    getNonMedicineSubCategories(category_id: number): Observable<SubCategoryResponse> {
      this.setToken()
      return this.http.get<SubCategoryResponse>(this.baseUrl + `pharmacy/non_medical/sub_category/${category_id}`, this.options)
    }

    // medicine ilaç ekleme
    addMedicine(medicine: Medicine): Observable<any> {
      this.setToken()
      return this.http.post<any>(this.baseUrl + `pharmacy/medicine/add`, medicine, this.options)
    }

    // non-medicine ilaç ekleme
    addNonMedicine(formData: FormData): Observable<any> {
      this.setToken()
      return this.http.post<any>(this.baseUrl + `pharmacy/non_medical/add`, formData, this.options)
    }

    //Medicine ilaçları getir
    getMedicines(sub_category_id: number): Observable<MedicineListResponse> {
      this.setToken()
      return this.http.get<MedicineListResponse>(this.baseUrl + `pharmacy/medicine/list/${sub_category_id}`, this.options)
    }

    //Medicine ilaçları getir
    getNonMedicinesPharmacy(sub_category_id: number): Observable<NonMedicineListResponse> {
      this.setToken()
      return this.http.get<NonMedicineListResponse>(this.baseUrl + `pharmacy/non_medical/list/${sub_category_id}`, this.options)
    }

    //Admin get pharmacy list
    getAdminPharmacyList(): Observable<PharmacyResponse> {
      this.setToken()
      return this.http.get<PharmacyResponse>(this.baseUrl + `admin/pharmacy_list`, this.options)
    }

     //Admin approve pharmacy
     adminApprovePharmacy(pharmacy_user_id: number): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `admin/accept/${pharmacy_user_id}`, this.options)
    }

     //Admin denie pharmacy
     adminDeniePharmacy(pharmacy_user_id: number): Observable<any> {
      this.setToken()
      return this.http.get<any>(this.baseUrl + `admin/denie/${pharmacy_user_id}`, this.options)
    }

    //Get customer orders
    getCustomerOrders(): Observable<CustomerOrderResponse> {
      this.setToken()
      return this.http.get<CustomerOrderResponse>(this.baseUrl +  `user/shopping/orders`, this.options)
    }

    //Get customer orders
    getCustomerOrderDetail(order_id: number): Observable<CustomerOrderDetailResponse> {
      this.setToken()
      return this.http.get<CustomerOrderDetailResponse>(this.baseUrl +  `user/shopping/order/${order_id}`, this.options)
    }

    // sipariş statü güncelle
    updateCustomerOrderStatus(order_id: number, canceled_cause: String): Observable<any> {
      this.setToken()
      return this.http.post<any>(this.baseUrl + `user/shopping/cancel/${order_id}`, {
        "canceled_cause": canceled_cause
      }, this.options)
    }

    // profil detayı getir
    getProfileData(): Observable<UserProfileResponse> {
      this.setToken()
      return this.http.get<UserProfileResponse>(this.baseUrl +  `user/profile`, this.options)
    }

    // update user profil 
    updateUserProfile(email: string, mobile: string): Observable<any> {
      this.setToken()
      return this.http.post<any>(this.baseUrl + `user/profile/update`, {
        "email": email,
        "mobile": mobile,
      }, this.options)
    }
}