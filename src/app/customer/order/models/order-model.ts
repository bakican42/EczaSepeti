export class CustomerOrder {
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
  created_at: string;
  updated_at: string;

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
    created_at: string,
    updated_at: string
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
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export class OrderData {
  taken: CustomerOrder[];
  preparing: CustomerOrder[];
  on_the_way: CustomerOrder[];
  delivered: CustomerOrder[];
  canceled: CustomerOrder[];

  constructor(
    taken: CustomerOrder[],
    preparing: CustomerOrder[],
    on_the_way: CustomerOrder[],
    delivered: CustomerOrder[],
    canceled: CustomerOrder[]
  ) {
    this.taken = taken;
    this.preparing = preparing;
    this.on_the_way = on_the_way;
    this.delivered = delivered;
    this.canceled = canceled;
  }
}

export class CustomerOrderResponse {
  success: boolean;
  data: OrderData;
  message: string;

  constructor(success: boolean, data: OrderData, message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
