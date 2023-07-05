import { Component, OnInit } from '@angular/core';
// import { Chart, ChartItem } from 'chart.js';
// import { ORDER_COUNT } from 'src/app/graphql/orders.graphql';
// import { ORDER_STATUS_COUNT } from 'src/app/graphql/order_status.graphql';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-graphic',
  templateUrl: './graphic.component.html',
  styles: [],
  providers: []
})
export class GraphicComponent implements OnInit {

  public count: number = 0
  public loading: boolean = true
  public invoiceCount: number[] = []
  public orderOpenCount: number[] = []
  public orderCloseCount: number[] = []
  public orderStatusNames: String[] = []
  public orderStatusCountService: Number[] = []
  public orderStatusCountCustomer: Number[] = []

//   public ctx: HTMLElement | ChartItem | null = null
//   public ctx2: HTMLElement | ChartItem | null = null

  constructor(
    // private getOrderCount: ORDER_COUNT,
    // private getOrderStatusCount: ORDER_STATUS_COUNT,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // order count
    // this.getOrderCount.fetch().subscribe(result => {
    //   this.count = result.data.orders_aggregate.aggregate.count
    // })
    // this.invoiceCountRecursive()
    // this.orderOpenCountRecursive()
    // this.orderCloseCountRecursive()
    // setTimeout(() => {
    //   this.setStatusNames()
    // }, 2000)
  }

//   // order invoice count
//   invoiceCountRecursive(i = 1) {
//     if (i == 1) this.invoiceCount = []
//     this.getOrderCount.fetch({
//       "where": {
//         "order_invoices": { "_and": [{ "date": { "_gte": `2022-${i}-01` } }, { "date": { "_lte": `2022-${i}-${new Date(2022, i, 0).getDate()}` } }] }
//       }
//     }, { fetchPolicy: 'no-cache' }).subscribe(result => {
//       this.invoiceCount.push(result.data.orders_aggregate.aggregate.count)
//       if (i != 12) this.invoiceCountRecursive(i + 1)
//     })
//   }

//   // order open count
//   orderOpenCountRecursive(i = 1) {
//     if (i == 1) this.orderOpenCount = []
//     this.getOrderCount.fetch({
//       "where": {
//         "status_id": { "_in": [1, 11] },
//         "_and": [{ "updated_at": { "_gte": `2022-${i}-01` } }, { "updated_at": { "_lte": `2022-${i}-${new Date(2022, i, 0).getDate()}` } }]
//       }
//     }, { fetchPolicy: 'no-cache' }).subscribe(result => {
//       this.orderOpenCount.push(result.data.orders_aggregate.aggregate.count)
//       if (i != 12) this.orderOpenCountRecursive(i + 1)
//     })
//   }

//   // order close count
//   orderCloseCountRecursive(i = 1) {
//     if (i == 1) this.orderCloseCount = []
//     this.getOrderCount.fetch({
//       "where": {
//         "status_id": { "_in": [10, 20] },
//         "_and": [{ "updated_at": { "_gte": `2022-${i}-01` } }, { "updated_at": { "_lte": `2022-${i}-${new Date(2022, i, 0).getDate()}` } }]
//       }
//     }, { fetchPolicy: 'no-cache' }).subscribe(result => {
//       this.orderCloseCount.push(result.data.orders_aggregate.aggregate.count)
//       if (i != 12) this.orderCloseCountRecursive(i + 1)
//     })
//   }

//   setStatusNames() {
//     let where = {
//       "order_status": { "status_group_id": { "_eq": 2 } }
//     }
//     this.getOrderStatusCount.subscribe({ "orders_where": where }).subscribe(response => {
//       if (response.data) {
//         response.data.order_status.forEach(os => {
//           if (!this.orderStatusNames.includes(os.name) && os.orders_aggregate.aggregate.count) {
//             this.orderStatusNames.push(os.name)
//             this.orderStatusCountService.push(os.orders_aggregate.aggregate.count)
//           }
//         })
//         // customer count
//         where = {
//           "order_status": { "status_group_id": { "_eq": 3 } }
//         }
//         this.getOrderStatusCount.subscribe({ "orders_where": where }).subscribe(response => {
//           if (response.data) {
//             response.data.order_status.forEach(os => {
//               if (os.orders_aggregate.aggregate.count) {
//                 this.orderStatusCountCustomer.push(os.orders_aggregate.aggregate.count)
//               }
//             })
//             setTimeout(() => {
//               this.loading = false
//               this.setChart()
//             }, 500)
//           }
//         })
//       }
//     })
//   }

//   setChart() {
//     this.ctx = this.ctx2 = null
//     this.ctx = document.getElementById('myChart')
//     new Chart(this.ctx as ChartItem, {
//       type: 'bar',
//       data: {
//         labels: this.orderStatusNames,
//         datasets: [
//           {
//             label: 'Servis',
//             data: this.orderStatusCountService,
//             borderRadius: 5
//           },
//           {
//             label: 'Müşteri',
//             data: this.orderStatusCountCustomer,
//             borderRadius: Number.MAX_VALUE
//           }
//         ]
//       },
//       options: {
//         indexAxis: 'y',
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           title: {
//             display: true,
//             text: 'Teklif Durumları'
//           }
//         }
//       }
//     })
//     this.ctx2 = document.getElementById('myChart2')
//     new Chart(this.ctx2 as ChartItem, {
//       type: 'line',
//       data: {
//         labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
//         datasets: [
//           {
//             label: 'Faturalar',
//             pointStyle: 'circle',
//             pointRadius: 6,
//             pointHoverRadius: 12,
//             tension: 0.4,
//             data: this.invoiceCount
//           },
//           {
//             label: 'Açılan Teklifler',
//             pointStyle: 'circle',
//             pointRadius: 6,
//             pointHoverRadius: 12,
//             tension: 0.4,
//             data: this.orderOpenCount
//           },
//           {
//             label: 'Kapanan Teklifler',
//             pointStyle: 'circle',
//             pointRadius: 6,
//             pointHoverRadius: 12,
//             tension: 0.4,
//             data: this.orderCloseCount
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           title: {
//             display: true,
//             text: 'Aylık Faturalar ve Teklifler'
//           }
//         },
//         animations: {
//           radius: {
//             duration: 400,
//             easing: 'linear',
//             loop: (context) => context.active
//           }
//         },
//         interaction: {
//           mode: 'nearest',
//           intersect: false,
//           axis: 'x'
//         }
//       }
//     })
//   }

}
