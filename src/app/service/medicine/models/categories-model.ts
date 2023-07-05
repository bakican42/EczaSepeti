export class Category {
  constructor(
    public id: number,
    public pharmacy_id: number,
    public category_name: string,
    public name: string = category_name
  ) {}
}

export class CategoryResponse {
  constructor(
    public success: boolean,
    public data: Category[],
    public message: string
  ) {}
}

export class SubCategory {
  constructor(
    public id: number,
    public sub_category_name: string,
    public name: string = sub_category_name
  ) {}
}

export class SubCategoryResponse {
  constructor(
    public success: boolean,
    public data: SubCategory[],
    public message: string
  ) {}
}
