export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  featured?: boolean;
  discount?: number;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string;
  createdAt: string;
};

export type Order = {
  id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation and 20-hour battery life.',
    price: 129.99,
    category: 'electronics',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.5,
    stock: 50,
    featured: true,
    discount: 15,
    createdAt: '2023-01-15T08:00:00Z',
  },
  {
    id: '2',
    name: 'Smartphone X Pro',
    description:
      'Latest smartphone with 6.7-inch display, 128GB storage, and triple camera system.',
    price: 899.99,
    category: 'electronics',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.8,
    stock: 25,
    featured: true,
    createdAt: '2023-02-10T10:30:00Z',
  },
  {
    id: '3',
    name: "Men's Casual T-Shirt",
    description: 'Comfortable cotton t-shirt for everyday wear, available in multiple colors.',
    price: 24.99,
    category: 'clothing',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.2,
    stock: 100,
    discount: 10,
    createdAt: '2023-03-05T14:15:00Z',
  },
  {
    id: '4',
    name: 'Smart Watch Series 5',
    description:
      'Track your fitness, receive notifications, and more with this advanced smartwatch.',
    price: 199.99,
    category: 'electronics',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.6,
    stock: 30,
    featured: true,
    createdAt: '2023-03-20T09:45:00Z',
  },
  {
    id: '5',
    name: 'Non-Stick Cooking Set',
    description:
      'Complete kitchen cookware set with non-stick coating for easy cooking and cleaning.',
    price: 89.99,
    category: 'home-kitchen',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.3,
    stock: 40,
    discount: 20,
    createdAt: '2023-04-12T11:20:00Z',
  },
  {
    id: '6',
    name: "Women's Running Shoes",
    description: 'Lightweight and comfortable running shoes with excellent support and cushioning.',
    price: 79.99,
    category: 'sports',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.4,
    stock: 60,
    featured: true,
    createdAt: '2023-05-08T16:30:00Z',
  },
  {
    id: '7',
    name: 'Facial Cleanser',
    description:
      'Gentle facial cleanser suitable for all skin types, removes makeup and impurities.',
    price: 19.99,
    category: 'beauty',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.7,
    stock: 75,
    createdAt: '2023-06-14T13:10:00Z',
  },
  {
    id: '8',
    name: 'Wireless Gaming Mouse',
    description:
      'High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.',
    price: 59.99,
    category: 'electronics',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.5,
    stock: 45,
    discount: 10,
    createdAt: '2023-07-22T10:00:00Z',
  },
  {
    id: '9',
    name: 'Yoga Mat',
    description:
      'Non-slip yoga mat with excellent cushioning and support for all types of yoga practices.',
    price: 29.99,
    category: 'sports',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.3,
    stock: 55,
    createdAt: '2023-08-18T15:45:00Z',
  },
  {
    id: '10',
    name: 'Coffee Maker',
    description:
      'Programmable coffee maker with 12-cup capacity and built-in grinder for fresh coffee.',
    price: 149.99,
    category: 'home-kitchen',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.6,
    stock: 35,
    featured: true,
    createdAt: '2023-09-05T08:30:00Z',
  },
  {
    id: '11',
    name: 'Moisturizing Face Cream',
    description:
      'Hydrating face cream with natural ingredients for all-day moisture and protection.',
    price: 34.99,
    category: 'beauty',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.4,
    stock: 65,
    discount: 15,
    createdAt: '2023-10-10T12:20:00Z',
  },
  {
    id: '12',
    name: 'Laptop Backpack',
    description:
      'Durable backpack with padded laptop compartment, multiple pockets, and water-resistant material.',
    price: 49.99,
    category: 'accessories',
    image: '/placeholder.svg?height=300&width=300',
    rating: 4.5,
    stock: 70,
    createdAt: '2023-11-15T14:00:00Z',
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    image: '/placeholder.svg?height=200&width=200',
    productCount: 42,
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion for men, women, and children',
    image: '/placeholder.svg?height=200&width=200',
    productCount: 56,
  },
  {
    id: '3',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Everything for your home and kitchen needs',
    image: '/placeholder.svg?height=200&width=200',
    productCount: 38,
  },
  {
    id: '4',
    name: 'Beauty',
    slug: 'beauty',
    description: 'Skincare, makeup, and personal care products',
    image: '/placeholder.svg?height=200&width=200',
    productCount: 29,
  },
  {
    id: '5',
    name: 'Sports',
    slug: 'sports',
    description: 'Sports equipment and activewear',
    image: '/placeholder.svg?height=200&width=200',
    productCount: 34,
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    avatar: '/placeholder.svg?height=40&width=40',
    createdAt: '2023-01-10T08:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    avatar: '/placeholder.svg?height=40&width=40',
    createdAt: '2023-02-15T10:30:00Z',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/placeholder.svg?height=40&width=40',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'user',
    avatar: '/placeholder.svg?height=40&width=40',
    createdAt: '2023-03-20T14:15:00Z',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'user',
    avatar: '/placeholder.svg?height=40&width=40',
    createdAt: '2023-04-05T09:45:00Z',
  },
];

export const orders: Order[] = [
  {
    id: '1',
    userId: '1',
    products: [
      { productId: '1', quantity: 1, price: 129.99 },
      { productId: '5', quantity: 2, price: 89.99 },
    ],
    total: 309.97,
    status: 'delivered',
    createdAt: '2023-03-15T10:00:00Z',
    updatedAt: '2023-03-18T14:30:00Z',
  },
  {
    id: '2',
    userId: '2',
    products: [
      { productId: '3', quantity: 3, price: 24.99 },
      { productId: '7', quantity: 1, price: 19.99 },
    ],
    total: 94.96,
    status: 'shipped',
    createdAt: '2023-04-20T15:30:00Z',
    updatedAt: '2023-04-21T09:15:00Z',
  },
  {
    id: '3',
    userId: '4',
    products: [{ productId: '2', quantity: 1, price: 899.99 }],
    total: 899.99,
    status: 'processing',
    createdAt: '2023-05-10T11:45:00Z',
    updatedAt: '2023-05-10T16:20:00Z',
  },
  {
    id: '4',
    userId: '5',
    products: [
      { productId: '6', quantity: 1, price: 79.99 },
      { productId: '9', quantity: 1, price: 29.99 },
    ],
    total: 109.98,
    status: 'pending',
    createdAt: '2023-05-18T09:30:00Z',
    updatedAt: '2023-05-18T09:30:00Z',
  },
  {
    id: '5',
    userId: '1',
    products: [
      { productId: '10', quantity: 1, price: 149.99 },
      { productId: '11', quantity: 2, price: 34.99 },
    ],
    total: 219.97,
    status: 'delivered',
    createdAt: '2023-04-05T13:20:00Z',
    updatedAt: '2023-04-08T10:10:00Z',
  },
];

// Sales data for charts
export const monthlySales = [
  { month: 'Jan', sales: 4500 },
  { month: 'Feb', sales: 5200 },
  { month: 'Mar', sales: 6100 },
  { month: 'Apr', sales: 5800 },
  { month: 'May', sales: 7200 },
  { month: 'Jun', sales: 8100 },
  { month: 'Jul', sales: 7900 },
  { month: 'Aug', sales: 8500 },
  { month: 'Sep', sales: 9200 },
  { month: 'Oct', sales: 8700 },
  { month: 'Nov', sales: 9800 },
  { month: 'Dec', sales: 11500 },
];

export const categorySales = [
  { category: 'Electronics', sales: 35 },
  { category: 'Clothing', sales: 25 },
  { category: 'Home & Kitchen', sales: 20 },
  { category: 'Beauty', sales: 12 },
  { category: 'Sports', sales: 8 },
];

// Helper functions to get data
export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getRecentOrders(limit = 5): Order[] {
  return [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function getOrdersByUserId(userId: string): Order[] {
  return orders.filter((order) => order.userId === userId);
}
