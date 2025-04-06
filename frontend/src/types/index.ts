export type ResponseStatus = {
  status: boolean;
  code: number;
  message: string;
};

export type APIResponse<T> = {
  [Key in keyof T]: T[Key];
} & ResponseStatus;

export type UserRole = 'user' | 'admin';
export type LoginResponse = {
  token: string;
  userId: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  avatar: string;
  isActive: boolean;
  wishlist: [];
  createdAt: string;
  updatedAt: string;
};

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subCategory: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  discountedPrice: number;
  isActive?: boolean;
}

export interface Category {
  title: string;
  subCategories: Category[];
  description: string;
  _id: string;
}
