export class CustomerOrderDetail {
  id: number;
  basket_id: number;
  user_id: number;
  pharmacy_id: number;
  carrier_id: number | null;
  payment_type: string;
  payment_status: string;
  order_status: string;
  canceled_by: string | null;
  canceled_cause: string | null;
  user_address: string;
  total: number;
  SGK_total: number | null;
  basket: BasketItem[];

  constructor(
    id: number,
    basket_id: number,
    user_id: number,
    pharmacy_id: number,
    carrier_id: number | null,
    payment_type: string,
    payment_status: string,
    order_status: string,
    canceled_by: string | null,
    canceled_cause: string | null,
    user_address: string,
    total: number,
    SGK_total: number | null,
    basket: BasketItem[]
  ) {
    this.id = id;
    this.basket_id = basket_id;
    this.user_id = user_id;
    this.pharmacy_id = pharmacy_id;
    this.carrier_id = carrier_id;
    this.payment_type = payment_type;
    this.payment_status = payment_status;
    this.order_status = order_status;
    this.canceled_by = canceled_by;
    this.canceled_cause = canceled_cause;
    this.user_address = user_address;
    this.total = total;
    this.SGK_total = SGK_total;
    this.basket = basket;
  }
}

export class BasketItem {
  id: number;
  pharmacy_id: Pharmacy;
  medicine_category_id: MedicineCategory;
  medicine_sub_category_id: MedicineSubCategory;
  medicine_name: string;
  pharmacology_name: string;
  medicine_form_id: MedicineForm;
  stock: number;
  fee: number;
  SGK_fee: number;

  constructor(
    id: number,
    pharmacy_id: Pharmacy,
    medicine_category_id: MedicineCategory,
    medicine_sub_category_id: MedicineSubCategory,
    medicine_name: string,
    pharmacology_name: string,
    medicine_form_id: MedicineForm,
    stock: number,
    fee: number,
    SGK_fee: number
  ) {
    this.id = id;
    this.pharmacy_id = pharmacy_id;
    this.medicine_category_id = medicine_category_id;
    this.medicine_sub_category_id = medicine_sub_category_id;
    this.medicine_name = medicine_name;
    this.pharmacology_name = pharmacology_name;
    this.medicine_form_id = medicine_form_id;
    this.stock = stock;
    this.fee = fee;
    this.SGK_fee = SGK_fee;
  }
}

export class Pharmacy {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class MedicineCategory {
  id: number;
  category_name: string;

  constructor(id: number, category_name: string) {
    this.id = id;
    this.category_name = category_name;
  }
}

export class MedicineSubCategory {
  id: number;
  sub_category_name: string;

  constructor(id: number, sub_category_name: string) {
    this.id = id;
    this.sub_category_name = sub_category_name;
  }
}

export class MedicineForm {
  id: number;
  form_name: string;

  constructor(id: number, form_name: string) {
    this.id = id;
    this.form_name = form_name;
  }
}

export class CustomerOrderDetailResponse {
  success: boolean;
  data: CustomerOrderDetail;
  message: string;

  constructor(success: boolean, data: CustomerOrderDetail, message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
