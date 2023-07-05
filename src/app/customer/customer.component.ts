import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: ['app-customer-navbar{margin-bottom:40px}'],
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
