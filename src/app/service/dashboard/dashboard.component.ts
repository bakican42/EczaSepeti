import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
// import { Permission } from 'src/app/interfaces/permission.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [],
  providers: [ApiService]
})
export class DashboardComponent implements OnInit {

  public orderStatusId: Number = 0
//   public permission: Permission = {} as Permission

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // permission
    // this.permission = this.authService.permission('service', 'DashboardComponent')
    this.apiService.getMedicineCategory().subscribe((response => {
      console.log(response)
    }));
  }

  selectOrderStatus(orderStatusId: any) {
    this.orderStatusId = Number(orderStatusId)
  }

}
