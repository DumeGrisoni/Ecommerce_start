export type ProductType = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

export type Order = {
  id: number;
  total: number;
  date: string;
  products: CartItemType[];
  userId: number;
  createdAt: string;
  status: string;
  items: OrderItem[];
};

export type OrderStateType = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

export type OrderItem = {
  id: number;
  orderId: number;
  price: number;
  productId: number;
  quantity: number;
  product: ProductType;
};
