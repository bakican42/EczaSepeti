import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { OrderDetailData } from './order_detail_model';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Courier } from './couriers_model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [],
  providers: [ApiService],
})
export class OrdersDetailComponent implements OnInit {
  private orderId: number;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.orderId = this.activatedRoute.snapshot.params['id'];
  }

  public orderDetailData: OrderDetailData = OrderDetailData.init();

  ngOnInit(): void {
    this.fetchOrder();
  }

  fetchOrder() {
    this.apiService
      .getPharmacyOrderDetail(this.orderId)
      .subscribe((response) => {
        if (response.success) {
          this.orderDetailData = response.data;
        }
      });
  }

  private canceledCause: String | undefined;
  async onStatusButtonClicked(status: string) {
    if (status == 'on_the_way') {
      this.fetchCouriers();
      return;
    }

    if (status == 'canceled') {
      const result = await Swal.fire<Promise<String>>({
        title: 'İptal sebebi?',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Kaydet',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isDismissed || result.isDenied) {
        return;
      }

      this.canceledCause = result.value;
    }

    this.apiService
      .updateOrderStatus(this.orderId, status, this.orderDetailData.carrier_id, this.canceledCause)
      .subscribe((response) => {
        if (response.success) {
          this.fetchOrder();
        }
      });
  }

  public courierSubject: BehaviorSubject<Courier[]> = new BehaviorSubject<
    Courier[]
  >([]);
  public courierObservable = this.courierSubject.asObservable();

  fetchCouriers() {
    this.apiService.getCourierList().subscribe((response) => {
      console.log(response);
      if (response.success) {
        this.courierSubject.next(response.data);
      }
    });
  }

  onCourierClick(courier: Courier) {
    this.apiService
      .updateOrderStatus(this.orderId, 'on_the_way', courier.id, undefined)
      .subscribe((response) => {
        if (response.success) {
          this.courierSubject.next([]);
          this.fetchOrder();
        }
      });
  }
}
