export type UserApiResponse = {
  status: "success";
  message: string;
  data: User[];
};
export type User = {
  id: number;
  email: string;
  phone: string;
  full_name: string;
  is_active: boolean;
};