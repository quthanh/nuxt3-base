export interface AuthParams {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface RegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  token_invite?: string;
  shopify_domain?: string;
}

export interface RegisterVerify {
  token: string;
  is_approve: number;
}
