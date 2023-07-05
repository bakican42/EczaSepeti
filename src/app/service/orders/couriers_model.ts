export class Courier {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public mobile: string,
    public organization_name: number,
    public job: string,
    public title: string,
    public email: string,
    public status: string,
    public created_at: string,
    public updated_at: string
  ) {}
}

export class CourierResponse {
  constructor(
    public success: boolean,
    public data: Courier[],
    public message: string
  ) {}
}
