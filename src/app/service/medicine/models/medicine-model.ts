export class Medicine {
  constructor(
    public medicine_category_id: number,
    public medicine_sub_category_id: number,
    public medicine_name: string,
    public pharmacology_name: string,
    public prescription: number,
    public medicine_form_id: number,
    public stock: number,
    public fee: number,
    public SGK_fee: number,
    public name: string = medicine_name,
  ) {}

  static init(): Medicine {
    return new Medicine(
      0,
      0,
      '',
      '',
      1,
      1,
      0,
      0,
      0,
    );
  }
}

export class MedicineListResponse {
  success: boolean;
  data: Medicine[];
  message: string;

  constructor(success: boolean, data: Medicine[], message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}