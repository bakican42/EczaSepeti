import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CustomerOrderDetail } from '../models/order-detail';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: [],
  providers: [ApiService]
})
export class OrderDetailComponent {
  private orderId: number;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.orderId = this.activatedRoute.snapshot.params['id'];
  }

  public orderDetailData: CustomerOrderDetail | undefined;

  ngOnInit(): void {
    this.fetchOrder();
  }

  fetchOrder() {
    this.apiService
      .getCustomerOrderDetail(this.orderId)
      .subscribe((response) => {
        if (response.success) {
          this.orderDetailData = response.data;
        }
      });
  }

  private canceledCause: String | undefined;
  async onStatusButtonClicked() {
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

    this.apiService
      .updateCustomerOrderStatus(this.orderId, this.canceledCause!)
      .subscribe((response) => {
        if (response.success) {
          this.fetchOrder();
        }
      });
  }
}
