import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Category, SubCategory } from '../../models/categories-model';
import { Medicine } from '../../models/medicine-model';

@Component({
  selector: 'app-prescription-add',
  templateUrl: './prescription-add.component.html',
  styleUrls: [],
  providers: [ApiService],
})
export class PrescriptionAddComponent {
  constructor(private apiService: ApiService) {}

  public categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);
  public subCategoriesSubject: BehaviorSubject<SubCategory[]> =
    new BehaviorSubject<SubCategory[]>([]);

  public categoriesObservable = this.categoriesSubject.asObservable();
  public subCategoriesObservable = this.subCategoriesSubject.asObservable();

  public medicineModel: Medicine = Medicine.init();

  ngOnInit(): void {
    this.getMedicineCategories();
  }

  private categories: Category[] = [];
  getMedicineCategories() {
    this.apiService.getMedicineCategories().subscribe((response) => {
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

    this.medicineModel.medicine_category_id = value;
    const category = this.categories.find(
      (category) => category.id.toString() === value?.toString()
    );
    this.getMedicineSubCategories(category!.id);
  }

  private subCategories: SubCategory[] = [];
  getMedicineSubCategories(category_id: number) {
    this.apiService
      .getMedicineSubCategories(category_id)
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
  onSubCategorySelected(value: number | null) {
    if (value === null) {
      return;
    }

    this.medicineModel.medicine_sub_category_id = value;
  }

  public isSaving: boolean = false;
  addMedicine() {
    this.isSaving = true;
    this.apiService.addMedicine(this.medicineModel).subscribe((response) => {
      if (response.success) {
        Swal.fire('İşlem başarılı', 'İlaç Kayıt Edildi', 'success');
      }
      this.isSaving = false;
    });
  }
}
