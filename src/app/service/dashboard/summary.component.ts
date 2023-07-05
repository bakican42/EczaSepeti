import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { OrderStatus, ORDER_STATUSES } from 'src/app/graphql/order_status.graphql';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-service-summary',
  templateUrl: './summary.component.html',
  styles: [],
  providers: []
})
export class SummaryComponent implements OnInit {

//   public orderStatus: OrderStatus[] | undefined;
//   @Output() selectOrderStatus = new EventEmitter<number | null>()

  constructor(
    private authService: AuthService,
    // private getOrderStatus: ORDER_STATUSES
  ) { }

  ngOnInit(): void {
    // this.getOrderStatus.fetch({
    //   "orders_where": { "service_id": { "_eq": this.authService.companyId } }
    // }).subscribe(response => {
    //   this.orderStatus = response.data.order_status
    // })
  }

  chooseOrderStatus(orderStatusId: Number) {
    // this.selectOrderStatus.emit(Number(orderStatusId))
  }

}
