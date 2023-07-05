export class OrderDetail {
  constructor(
    public success: boolean,
    public data: OrderDetailData,
    public message: string
  ) {}
}

export class OrderDetailData {
  constructor(
    public id: number,
    public basket_id: number,
    public user_id: number,
    public pharmacy_id: number,
    public carrier_id: number | null,
    public payment_type: string,
    public payment_status: string,
    public order_status: string,
    public canceled_by: string,
    public canceled_cause: string,
    public user_address: string,
    public total: number,
    public SGK_total: number,
    public basket: BasketItem[]
  ) {}

  static init(): OrderDetailData {
    return new OrderDetailData(
      0,
      0,
      0,
      0,
      null,
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      0,
      []
    );
  }
}

export class BasketItem {
  constructor(
    public id: number,
    public pharmacy_id: Pharmacy,
    public medicine_category_id: MedicineCategory,
    public medicine_sub_category_id: MedicineSubCategory,
    public medicine_name: string,
    public pharmacology_name: string,
    public medicine_form_id: MedicineForm,
    public stock: number,
    public fee: number,
    public SGK_fee: number
  ) {}
}

export class Pharmacy {
  constructor(public id: number, public name: string) {}
}

export class MedicineCategory {
  constructor(public id: number, public category_name: string) {}
}

export class MedicineSubCategory {
  constructor(public id: number, public sub_category_name: string) {}
}

export class MedicineForm {
  constructor(public id: number, public form_name: string) {}
}
