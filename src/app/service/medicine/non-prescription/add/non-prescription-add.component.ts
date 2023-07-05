import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { NonMedicine } from '../../models/non-medicine-model';
import { Category, SubCategory } from '../../models/categories-model';

@Component({
  selector: 'app-non-prescription-add',
  templateUrl: './non-prescription-add.component.html',
  styleUrls: [],
  providers: [ApiService],
})
export class NonPrescriptionAddComponent {
  constructor(private apiService: ApiService) {}

  public medicineModel: NonMedicine = NonMedicine.init();

  public categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >([]);
  public subCategoriesSubject: BehaviorSubject<SubCategory[]> =
    new BehaviorSubject<SubCategory[]>([]);

  public categoriesObservable = this.categoriesSubject.asObservable();
  public subCategoriesObservable = this.subCategoriesSubject.asObservable();

  ngOnInit(): void {
    this.getMedicineCategories();
  }

  private categories: Category[] = [];
  getMedicineCategories() {
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

    this.medicineModel.non_medical_category_id = value;
    const category = this.categories.find(
      (category) => category.id.toString() === value?.toString()
    );
    this.getMedicineSubCategories(category!.id);
  }

  private subCategories: SubCategory[] = [];
  getMedicineSubCategories(category_id: number) {
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
  onSubCategorySelected(value: number | null) {
    if (value === null) {
      return;
    }

    this.medicineModel.non_medical_sub_category_id = value;
  }

  onImageChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.medicineModel.data = fileList[0];
      this.readImageAsDataUrl(fileList[0]).then((dataUrl) => {
        this.imageUrl = dataUrl;
      });
    }
  }

  public imageUrl: any = null;
  readImageAsDataUrl(imageFile: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        resolve(event.target?.result as string);
      };
      reader.onerror = (event: ProgressEvent<FileReader>) => {
        reject(event.target?.error);
      };
      reader.readAsDataURL(imageFile);
    });
  }

  public isSaving: boolean = false;
  addNonMedicine() {
    this.isSaving = true;
    const formData = new FormData();
    formData.append(
      'non_medical_category_id',
      this.medicineModel.non_medical_category_id.toString()
    );
    formData.append(
      'non_medical_sub_category_id',
      this.medicineModel.non_medical_sub_category_id.toString()
    );
    formData.append('medicine_name', this.medicineModel.medicine_name);
    formData.append('definition', this.medicineModel.definition);
    formData.append('prescription', this.medicineModel.prescription.toString());
    formData.append('stock', this.medicineModel.stock.toString());
    formData.append('fee', this.medicineModel.fee.toString());

    if (this.medicineModel.data) {
      formData.append(
        'data',
        this.medicineModel.data,
        this.medicineModel.data.name
      );
    }

    this.apiService.addNonMedicine(formData).subscribe((response) => {
      if (response.success) {
        Swal.fire('İşlem başarılı', 'İlaç Kayıt Edildi', 'success');
      }
      this.isSaving = false;
    });
  }
}
