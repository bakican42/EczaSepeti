export class UserProfile {
  id: number;
  name: string;
  surname: string;
  email: string;
  mobile: string;
  TC_no: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;

  constructor(
    id: number,
    name: string,
    surname: string,
    email: string,
    mobile: string,
    TC_no: string,
    email_verified_at: string | null,
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.mobile = mobile;
    this.TC_no = TC_no;
    this.email_verified_at = email_verified_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

export class UserProfileResponse {
  success: boolean;
  data: UserProfile;
  message: string;

  constructor(success: boolean, data: UserProfile, message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
