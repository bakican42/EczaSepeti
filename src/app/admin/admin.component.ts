import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [],
  providers: []
})
export class AdminComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void { }

}