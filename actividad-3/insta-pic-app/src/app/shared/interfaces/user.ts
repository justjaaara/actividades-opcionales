export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignUpFormData extends LoginFormData {
  email: string;
  rePassword: string;
}
