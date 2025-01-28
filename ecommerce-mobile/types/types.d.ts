export type ProductType = {
  id: number;
  name: string;
  description: string[];
  image: string[];
  price: number;
  productId: string;
};

export interface ProductWithVariant extends ProductType {
  variant: VariantProps;
}

export type VariantProps = {
  id: number;
  productId: string;
  colors: Color[];
};

interface VariantComposantProps {
  variant?: VariantProps;
  onConfirm: (variant: VariantProps) => void;
}

export interface Size {
  size: string;
  stock: number;
}
export interface Color {
  name: string;
  sizes: Size[];
}

export type CartItemType = {
  product: ProductWithVariant;
  quantity: number;
};

export type CartStateType = {
  items: CartItemType[];
  addProduct: (product: ProductWithVariant, quantity: number) => void;
  resetCart: () => void;
  removeProduct: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
};

export type userType = {
  id: number;
  email: string;
  name: string;
  surname: string;
  adress: string;
  postalCode: number;
  city: string;
};

export type authStateType = {
  user: userType | null;
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    email: string,
    password: string,
    name: string,
    surname: string,
    adress: string,
    postalCode: number,
    city: string
  ) => void;
};
export type AuthActionsType = {
  setUser: (user: UserType) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
};

type AuthStoreType = AuthStateType & AuthActionsType;

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

type OrderStatus = 'Nouveau' | 'En cours' | 'Livraison' | 'Livrée' | 'Annulée';

export type OrderItem = {
  id: number;
  orderId: number;
  price: number;
  productId: number;
  quantity: number;
  product: ProductType;
};
