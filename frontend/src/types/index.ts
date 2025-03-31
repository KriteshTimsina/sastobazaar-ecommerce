export type ResponseStatus = {
  status: boolean;
  code: number;
  message: string;
};

export type APIResponse<T> = {
  [Key in keyof T]: T[Key];
} & ResponseStatus;

export type LoginResponse = {
  token: string;
  userId: string;
  username: string;
  email: string;
  avatar: string;
};

// {
//   "_id": '"67e9fdc726bab0f5642bbec7"',
//   username: 'user2',
//   email: 'user2@gmail.com',
//   role: 'user',
//   avatar: 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=626&ext=jpg&ga=GA1.1.393839023.1702357779&semt=ais',
//   isActive: true,
//   wishlist: [],
//   createdAt: '2025-03-31T02:28:23.310Z',
//   updatedAt: '2025-03-31T02:28:23.310Z',
//   __v: 0
// },

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
