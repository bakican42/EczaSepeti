import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Order, OrderResponse } from './orders_model';

@Component({
  selector: 'app-service-orders',
  templateUrl: './orders.component.html',
  styles: [],
  providers: [ApiService],
})
export class OrdersComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  private orderResponse:OrderResponse = OrderResponse.init();

  public ordersSubject: BehaviorSubject<Order[]> =
    new BehaviorSubject<Order[]>([]);
  public ordersObservable = this.ordersSubject.asObservable();

  ngOnInit(): void {
    this.fetchOrders(true);
  }

  fetchOrders(init: boolean = false) {
    this.apiService.getPharmacyOrders().subscribe((response) => {
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
    this.ordersSubject.next(this.orderResponse.data.taken);
  }

  onPrepairingClick() {this.fetchOrders()
    this.ordersSubject.next(this.orderResponse.data.preparing);
  }

  onOnTheWayClick() {
    this.fetchOrders()
    this.ordersSubject.next(this.orderResponse.data.on_the_way);
  }

  onDeliveredClick() {
    this.fetchOrders()
    this.ordersSubject.next(this.orderResponse.data.delivered);
  }

  onCanceledClick() {
    this.fetchOrders()
    this.ordersSubject.next(this.orderResponse.data.canceled);
  }
}
