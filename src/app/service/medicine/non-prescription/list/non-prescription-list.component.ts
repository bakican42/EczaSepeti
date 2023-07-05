import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Category, SubCategory } from '../../models/categories-model';
import { NonMedicine } from '../../models/non-medicine-model';

@Component({
  selector: 'app-non-prescription-list',
  templateUrl: './non-prescription-list.component.html',
  styleUrls: [],
  providers: [ApiService],
})
export class NonPrescriptionListComponent {
  constructor(private apiService: ApiService) {}

  public categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);
  public subCategoriesSubject: BehaviorSubject<SubCategory[]> =
    new BehaviorSubject<SubCategory[]>([]);
  public medicinesSubject: BehaviorSubject<NonMedicine[]> = new BehaviorSubject<
  NonMedicine[]
  >([]);

  public categoriesObservable = this.categoriesSubject.asObservable();
  public subCategoriesObservable = this.subCategoriesSubject.asObservable();
  public medicinesObservable = this.medicinesSubject.asObservable();

  ngOnInit(): void {
    this.getNonMedicineCategories();
  }

  private categories: Category[] = [];
  getNonMedicineCategories() {
    this.apiService.getNonMedicineCategories().subscribe((response) => {
      if (response.success) {
        this.categories = response.data.map((value) => {
          value.name = value.category_name;
          return value;
        });
        this.categoriesSubject.next(this.categories);
      }
    });
  }

  public selectedCategory: Category | undefined;
  onCategorySelected(value: number | null) {
    if (value === null) {
      return;
    }

    const category = this.categories.find(
      (category) => category.id.toString() === value?.toString()
    );
    this.getNonMedicineSubCategories(category!.id);
  }

  private subCategories: SubCategory[] = [];
  getNonMedicineSubCategories(category_id: number) {
    this.apiService
      .getNonMedicineSubCategories(category_id)
      .subscribe((response) => {
        if (response.success) {
          this.subCategories = response.data.map((value) => {
            value.name = value.sub_category_name;
            return value;
          });
          this.subCategoriesSubject.next(this.subCategories);
        }
      });
  }

  public selectedSubCategory: SubCategory | undefined;
  private selectedSubMedicineCategoryId: number = 0;
  onSubCategorySelected(value: number | null) {
    if (value === null) {
      return;
    }

    this.selectedSubMedicineCategoryId = value;
    this.fetchMedicines()
  }

  private medicines: NonMedicine[] = [];
  fetchMedicines() {
    if (this.selectedSubMedicineCategoryId == 0) {
      return;
    }

    this.apiService
      .getNonMedicinesPharmacy(this.selectedSubMedicineCategoryId)
      .subscribe((response) => {
        if (response.success) {
          this.medicines = response.data.map((value) => {
            value.name = value.medicine_name;
            return value;
          });
          this.medicinesSubject.next(this.medicines);
        }
      });
  }
}
