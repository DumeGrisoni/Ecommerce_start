export interface Size {
  size: string;
  stock: number;
}
export interface Color {
  name: string;
  sizes: Size[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  price: number;
  productId: number;
  colors: Color[];
  quantity: number;
}
