import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: [],
})
export class MedicineComponent {
  constructor(public router: Router) {}
}
