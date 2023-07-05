export class NonMedicine {
  constructor(
    public non_medical_category_id: number,
    public non_medical_sub_category_id: number,
    public medicine_name: string,
    public definition: string,
    public prescription: number,
    public stock: number,
    public fee: number,
    public data: File | null,
    public name: string = medicine_name,
  ) {}

  static init(): NonMedicine {
    return new NonMedicine(
      0,
      0,
      '',
      '',
      1,
      0,
      0,
      null
    );
  }
}

export class NonMedicineListResponse {
  success: boolean;
  data: NonMedicine[];
  message: string;

  constructor(success: boolean, data: NonMedicine[], message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}