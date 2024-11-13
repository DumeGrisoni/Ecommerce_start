export type ProductType = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

export type CartItemType = {
  product: ProductType;
  quantity: number;
};

export type CartStateType = {
  items: CartItemType[];
  addProduct: (product: ProductType, quantity: number) => void;
  resetCart: () => void;
  removeProduct: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
};
