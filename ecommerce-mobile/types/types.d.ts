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
  addProduct: (product: ProductType) => void;
};
