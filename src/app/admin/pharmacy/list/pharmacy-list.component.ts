import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Pharmacy, PharmacyResponse } from '../models/pharmacy-model';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacy-list',
  templateUrl: './pharmacy-list.component.html',
  styleUrls: [],
  providers: [ApiService],
})
export class PharmacyListComponent {
  constructor(private apiService: ApiService) {}

  private pharmacyResponse: PharmacyResponse | undefined;

  public pharmaciesSubject: BehaviorSubject<Pharmacy[]> = new BehaviorSubject<
    Pharmacy[]
  >([]);
  public isWaitingListSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public pharmacyObservable = this.pharmaciesSubject.asObservable();
  public isWaitingListObservable = this.isWaitingListSubject.asObservable();

  ngOnInit(): void {
    this.fetchData(true);
  }

  private apporedPharmacies: Pharmacy[] = [];
  private waitingPharmacies: Pharmacy[] = [];
  private deniedPharmacies: Pharmacy[] = [];

  fetchData(init: boolean = false) {
    this.apiService.getAdminPharmacyList().subscribe((response) => {
      if (response.success) {
        this.pharmacyResponse = response;
        this.splitPharmacies(this.pharmacyResponse.data);
        if (init) {
          this.pharmaciesSubject.next(this.apporedPharmacies);
        }
      }
    });
  }

  private splitPharmacies(list: Pharmacy[]) {
    this.apporedPharmacies = list.filter((e) => e.approval === 'approved');
    this.waitingPharmacies = list.filter((e) => e.approval === 'waiting');
    this.deniedPharmacies = list.filter((e) => e.approval === 'denied');
  }

  onApprovedClick() {
    this.fetchData();
    this.isWaitingListSubject.next(false)
    this.pharmaciesSubject.next(this.apporedPharmacies);
  }

  onWaitingClick() {
    this.fetchData();
    this.isWaitingListSubject.next(true)
    this.pharmaciesSubject.next(this.waitingPharmacies);
  }

  onDeniedClick() {
    this.fetchData();
    this.isWaitingListSubject.next(false)
    this.pharmaciesSubject.next(this.deniedPharmacies);
  }

  approvePharmacy(item: Pharmacy) {
    this.apiService.adminApprovePharmacy(item.user[0].id).subscribe((response) => {
      if(response.success) {
        Swal.fire('İşlem başarılı', 'Eczane Onaylandı', 'success');
        this.fetchData(true)
      }
    })
  }

  deniePharmacy(item: Pharmacy) {
    //TODO: change endpoint once implemented
    //Burada return ve console.logu kaldır.
    //Api service de urli düzelt gerisi tamam.
    console.log("No Endpoint")
    return
    this.apiService.adminDeniePharmacy(item.user[0].id).subscribe((response) => {
      if(response.success) {
        Swal.fire('İşlem başarılı', 'Eczane Reddedildi', 'success');
        this.fetchData(true)
      }
    })
  }
}
