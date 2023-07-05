import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styles: [],
})
export class ServiceComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void { }

}
