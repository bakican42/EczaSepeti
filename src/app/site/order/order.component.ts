import { Component, OnInit } from "@angular/core";
import { AlertifyService } from "src/app/services/alertify.service";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from "sweetalert2";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-site-order',
    templateUrl: './order.component.html',
    styles: [],
    providers: [ApiService]
})
export class OrderComponent implements OnInit {

    public step = 1
    public authTab: String = "register"
    public cityList: any[] = []
    public districtList: any[] = []
    public townList: any[] = []
    public services: any[] = []
    public serviceId: number = 0
    public district_name: string = "Aydınevler"
    public medicineType: any[] = [
        {
            id: 1,
            name: "Reçeteli"
        },
        {
            id: 2,
            name: "Reçetesiz"
        }
    ]
    public medicineTypeId: Number | undefined
    public prescriptionList: any[] = []
    public authTabs: String = "medicine"
    public categories: any[] = []
    public categoryId: number = 0
    public subCategories: any[] = []
    public subCategoryId: number = 0
    public nonMedicineList: any[] = []
    public allPrescriptionFreeMedicines: any[] = []
    public searchArraySubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])
    public searchArray = this.searchArraySubject.asObservable();
    public code: string = ""
    public prescriptionId: number = 0
    public prescriptionDetail: any[] = []
    public total: number = 0
    public basketId: number = 0
    public sgkTotal: number = 0
    public basketDetail: any[] = []
    public medicineContent: any[] = []
    public nonMedicineContent: any[] = []

    constructor(
        public authService: AuthService,
        private apiService: ApiService,
        private alertifyService: AlertifyService,
        public router: Router
    ) { }

    public formGroup = new FormGroup({
        card_no: new FormControl("", [Validators.required, Validators.minLength(19), Validators.maxLength(19)]),
        card_name: new FormControl('', [Validators.required]),
        cvv: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
        expired_date: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/(2[3-9]|[3-9]\d|\d{3,})$/)]),
        user_address: new FormControl("", [Validators.required])
    })

    ngOnInit(): void {
        if (this.authService.isUserLogin) {
            this.stepChange(1, true);
            this.getLocations();           
        }
    }

    getLocations() {
        this.getCities();
        this.getDistrict();
        this.getTown();
    }

    getCities() {
        this.apiService.getCities().subscribe(response => {
            const templist = []
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i];
                const temp = {"id":i,"name": element};
                templist.push(temp);
            }
            this.cityList = templist;
        })
    }

    getDistrict() {
        this.apiService.getDistrict().subscribe(response => {
            const templist = []
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i];
                const temp = {"id":i,"name": element};
                templist.push(temp);
            }
            this.districtList = templist;
        })
    }

    getTown() {
        this.apiService.getTown().subscribe(response => {
            const templist = []
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i];
                const temp = {"id":i,"name": element};
                templist.push(temp);
            }
            this.townList = templist;
        })
    }

    townMedicineSelected(event: any) {
        const town_name: string = this.townList[event].name;
        if (town_name) {
            this.apiService.getPrescriptionPharmacy(town_name, this.code).subscribe(response => {
                this.services = response.data
            })
        }
    }

    townNonMedicineSelected(event: any) {
        const town_name: string = this.townList[event].name;
        if (town_name) {
            this.apiService.getPharmacyList(town_name).subscribe(response => {
                this.services = response.data
            })
        }
    }

    authTabChange(tab: String) {
        this.authTab = tab
    }

    authTabsChange(tab: String) {
        this.authTabs = tab
        if (this.authTabs == 'nonMedicine') {
            this.apiService.getNonMedicineCategory(this.serviceId).subscribe(response => {
                const templist = []
                for (let i = 0; i < response.data.length; i++) {
                    const element = response.data[i];
                    const temp = {"id": element.id, "name": element.category_name, "pharmacy_id": element.pharmacy_id};
                    templist.push(temp);
                }
                this.categories = templist
            })
            return;
        }
      }

    chooseServiceAddress(serviceId: number, marker: boolean = false) {
        this.serviceId = serviceId
        if (marker && this.services) {
            const serviceName = this.services.find(s => s.id === serviceId)?.name
            this.alertifyService.success(serviceName + " Seçildi")
        }
        this.getNonMedicines()
    }

    medicineTypeSelected(event: any) {
        this.medicineTypeId = event
        if (this.medicineTypeId == 1) {
            this.apiService.getPrescription().subscribe(response => {
                this.prescriptionList = response.data
                console.log(this.prescriptionList)
            })
        } else {
            // this.getNonMedicines();
        }
    }

    search(event: any) {
        const search = event.target.value
        console.log(search)
        if (search == "") {
            console.log("array cleared");
            this.searchArraySubject.next([]);
            return;
        }
        var tempList = this.allPrescriptionFreeMedicines.filter(item =>  item.medicine_name.toLowerCase().includes(search.toLowerCase()));
        tempList = tempList.sort((a, b) => a.medicine_name.localeCompare(b.medicine_name));
        var itemsForCaching: any[] = [];
        tempList.forEach(medicine => {
            const item = itemsForCaching.find(x => x.medicine_name == medicine.medicine_name);
            if(!item) {
                itemsForCaching.push(medicine);
            }
        });
        this.searchArraySubject.next(itemsForCaching);
        //this.apiService.getMedicineSearch(this.serviceId, search).subscribe(response => {
        //    console.log(response)
        //})
    }

    selectCategory(categoryId: any) {
        this.categoryId = categoryId
        console.log(this.categoryId)
        if (this.categoryId) {
            this.apiService.getNonMedicineSubCategory(this.categoryId).subscribe(response => {
                const templist = []
                for (let i = 0; i < response.data.length; i++) {
                    const element = response.data[i];
                    const temp = {"id": element.id, "name": element.sub_category_name};
                    templist.push(temp);
                }
                this.subCategories = templist
            })
        }
    }

    selectSubCategory(subCategoryId: any) {
        this.subCategoryId = subCategoryId
        console.log(this.subCategoryId)
        if (this.subCategoryId) {
            this.apiService.getNonMedicine(this.serviceId,this.subCategoryId).subscribe(response => {
                console.log(response)
                this.nonMedicineList = response.data
            })
        }
    }

    getNonMedicines() {
            this.apiService.getNonMedicines(this.serviceId).subscribe(response => {
                this.allPrescriptionFreeMedicines = response.data
            })
    }

    addMedicineToBasket(item: any) {
        console.log(item)
        if (this.medicineContent.includes(item)) {
            return
        }
        this.medicineContent.push(item);
        this.alertifyService.success("İlaç Sepete Eklendi")
        console.log(this.medicineContent)
    }

    get getMedicineBascetTotal(): number {
        return this.medicineContent.map((e) => e.fee).reduce((a, b) => a + b)
    }

    addNonMedicineToBasket(item: any) {
        console.log(item)
        if (this.nonMedicineContent.includes(item)) {
            return
        }
        this.nonMedicineContent.push(item);
        this.alertifyService.success("Ürün Sepete Eklendi")
        console.log(this.nonMedicineContent)
    }
    get getNonMedicineBascetTotal(): number {
        return this.nonMedicineContent.map((e) => e.fee).reduce((a, b) => a + b)
    }

    addPrescriptionBasket() {
        const addData = {
            pharmacy_id: this.serviceId,
            is_medicine: "1",
            prescription_id: this.prescriptionId
        }
        this.apiService.prescriptionAddBasket(addData).subscribe(response => {
            if (response.data) {
                this.alertifyService.success("Ürünleriniz Sepete Eklendi")
                this.apiService.getBasket().subscribe(response => {
                    console.log(response)
                    if (response.data) {
                        this.basketId = response.data.basket_id
                    }
                })
            }
        })
    }

    addNonPrescriptionBasket() {
        const addData = {
            pharmacy_id: this.serviceId,
            is_medicine: "0",
            medicine_content: this.medicineContent.map((e) => e.id),
            non_medicine_content: this.nonMedicineContent.map((e) => e.id)
        }
        console.log(addData)
        this.apiService.prescriptionAddBasket(addData).subscribe(response => {
            if (response.data) {
                this.alertifyService.success("Ürünleriniz Sepete Eklendi")
                this.apiService.getBasket().subscribe(response => {
                    console.log(response)
                    if (response.data) {
                        this.basketId = response.data.basket_id
                    }
                })
            }
        })
    }

    createOrder() {
        if (this.formGroup.valid) {
            const buyData: any = {
                card_name: this.formGroup.value.card_name,
                card_no: this.formGroup.value.card_no?.replace(/\s/g, ''),
                expired_date: this.formGroup.value.expired_date,
                cvv: this.formGroup.value.cvv,
                user_address: this.formGroup.value.user_address,
                payment_type: "card"
            }
            this.apiService.buyBasket(this.basketId, buyData).subscribe(response => {
                console.log(response)
                if (response.data) {
                    this.router.navigateByUrl('/customer');
                }
            })
        } else {

        }
    }

    // son kullanma tarih
    formatExpirationDate() {
        let value: any = this.formGroup.get('expired_date')?.value;
        value = value.replace(/\D/g, ''); // Sadece sayısal karakterleri alın

        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        this.formGroup.get('expired_date')?.setValue(value);
    }
    // kart number
    formatCardNo() {
        let value: any = this.formGroup.get('card_no')?.value;
        value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();

        this.formGroup.get('card_no')?.setValue(value);
    }

    checkPrescription(code: string, id: number) {
        this.code = code
        this.prescriptionId = id
    }

    getPrescriptionDetail() {
        if (this.code && this.serviceId) {
            this.apiService.getPrescriptionDetail(this.serviceId, this.code).subscribe(response => {
                if (response.data) {
                    this.prescriptionDetail = response.data.medicine_list
                    this.total = response.data.sgk_total
                }
            })
        }
    }

    stepChange(step: number, isContinue: Boolean) {
        console.log("step", step)
        console.log("isContiune", isContinue)
        switch (this.step) {
            case 1:
                if (isContinue) {
                    this.step = this.authService.isUserLogin ? step + 1 : step
                } else {
                    this.step = this.authService.isUserLogin ? step - 1 : step
                }
                break;
            case 2: // ECZANE BİLGİLERİ
                if (isContinue) {
                    this.step = step
                    this.getPrescriptionDetail();
                } else {
                    this.step = this.authService.isUserLogin ? step - 1 : step
                }
                break;
            case 3: // İLAÇ TİP BİLGİLERİ
                if (isContinue) {
                    this.step = step
                    this.getPrescriptionDetail();
                } else {
                    this.step = this.authService.isUserLogin ? step - 1 : step
                }
                break;
            case 4:
                if (isContinue) {
                    if (this.medicineTypeId == 1) {
                        this.addPrescriptionBasket()
                    }
                    if (this.medicineTypeId == 2) {
                        this.addNonPrescriptionBasket()
                    }
                    this.step = step
                } else {
                    this.step = this.authService.isUserLogin ? step - 1 : step
                }
                break;
            case 5:
                if (isContinue) {
                    this.step = step
                } else {
                    this.step = this.authService.isUserLogin ? step - 1 : step
                }
                break;
        }
    }

    nextButton(): boolean {
        return this.step < 5 && this.step != 1
    }

    login(isLogin: boolean) {
        if (isLogin) {
            this.getLocations();
            this.step++;
        }
    }
}