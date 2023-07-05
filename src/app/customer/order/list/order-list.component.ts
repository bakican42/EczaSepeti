import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CustomerOrder, CustomerOrderResponse } from '../models/order-model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: [],
  providers: [ApiService]
})
export class OrderListComponent {
  constructor(private apiService: ApiService) {}

  private orderResponse:CustomerOrderResponse | undefined;

  public ordersSubject: BehaviorSubject<CustomerOrder[]> =
    new BehaviorSubject<CustomerOrder[]>([]);
  public ordersObservable = this.ordersSubject.asObservable();

  ngOnInit(): void {
    this.fetchOrders(true);
  }

  fetchOrders(init: boolean = false) {
    this.apiService.getCustomerOrders().subscribe((response) => {
      if(response.success) {
        this.orderResponse = response;
        if(init) {
            this.ordersSubject.next(this.orderResponse.data.taken);
        }
      }
    });
  }

  onTakenClick() {
    this.fetchOrders()
    this.ordersSubject.next(this.orderResponse!.data.taken);
  }

  onPrepairingClick() {this.fetchOrders()
    this.ordersSubject.next(this.orderResponse!.data.preparing);
  }

  onOnTheWayClick() {
    this.fetchOrders()
    this.ordersSubject.next(this.orderResponse!.data.on_the_way);
  }

  onDeliveredClick() {
    this.fetchOrders()
    this.ordersSubject.next(this.orderResponse!.data.delivered);
  }

  onCanceledClick() {
    this.fetchOrders()
    this.ordersSubject.next(this.orderResponse!.data.canceled);
  }
}
