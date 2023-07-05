export class User {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public email: string,
    public mobile: string,
    public TC_no: string,
    public email_verified_at: string | null,
    public created_at: string,
    public updated_at: string
  ) {}

  equals(other: User): boolean {
    // Compare the relevant properties for equality
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.surname === other.surname &&
      this.email === other.email &&
      this.mobile === other.mobile &&
      this.TC_no === other.TC_no &&
      this.email_verified_at === other.email_verified_at &&
      this.created_at === other.created_at &&
      this.updated_at === other.updated_at
    );
  }
}

export class Order {
  constructor(
    public id: number,
    public basket_id: number,
    public user_id: number,
    public pharmacy_id: number,
    public carrier_id: number | null,
    public payment_type: string,
    public payment_status: string,
    public order_status: string,
    public canceled_by: string | null,
    public canceled_cause: string | null,
    public user_address: string,
    public total: number,
    public SGK_total: number | null,
    public created_at: string,
    public updated_at: string,
    public user: User,
    public courrier: User | null
  ) {}

  equals(other: Order): boolean {
    // Compare the relevant properties for equality
    return (
      this.id === other.id &&
      this.basket_id === other.basket_id &&
      this.user_id === other.user_id &&
      this.pharmacy_id === other.pharmacy_id &&
      this.carrier_id === other.carrier_id &&
      this.payment_type === other.payment_type &&
      this.payment_status === other.payment_status &&
      this.order_status === other.order_status &&
      this.canceled_by === other.canceled_by &&
      this.canceled_cause === other.canceled_cause &&
      this.user_address === other.user_address &&
      this.total === other.total &&
      this.SGK_total === other.SGK_total &&
      this.created_at === other.created_at &&
      this.updated_at === other.updated_at &&
      this.user.equals(other.user)
    );
  }
}

export class OrderResponse {
  public success: boolean;
  public data: {
    taken: Order[];
    preparing: Order[];
    on_the_way: Order[];
    delivered: Order[];
    canceled: Order[];
  };
  public message: string;

  constructor(
    success: boolean,
    data: {
      taken: Order[];
      preparing: Order[];
      on_the_way: Order[];
      delivered: Order[];
      canceled: Order[];
    },
    message: string
  ) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  static init(): OrderResponse {
    return new OrderResponse(
      false,
      {
        taken: [],
        preparing: [],
        on_the_way: [],
        delivered: [],
        canceled: [],
      },
      ''
    );
  }
}
