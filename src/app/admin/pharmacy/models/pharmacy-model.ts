export class User {
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

export class Pharmacy {
  constructor(
    public id: number,
    public name: string,
    public city: string,
    public district: string,
    public address: string,
    public status: string,
    public approval: string,
    public created_at: string,
    public updated_at: string,
    public user: User[]
  ) {}
}

export class PharmacyResponse {
  constructor(
    public success: boolean,
    public data: Pharmacy[]
  ) {}
}
