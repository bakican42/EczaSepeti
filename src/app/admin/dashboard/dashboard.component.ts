import { Component, OnInit } from '@angular/core';
// import { Permission } from 'src/app/interfaces/permission.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
  providers: []
})
export class DashboardComponent implements OnInit {

  public orderStatusId: Number = 0
//   public permission: Permission = {} as Permission

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // permission
    // this.permission = this.authService.permission('admin', 'DashboardComponent')
  }

  selectOrderStatus(orderStatusId: any) {
    this.orderStatusId = Number(orderStatusId)
  }

}