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
  products: ProductType[];
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

type OrderItemDetailsProps = {
  item: OrderItem;
  isSmallScreen: boolean;
  isLast: boolean;
};

type LabelValuePairProps = {
  label: string;
  value: string | number;
  isSmallScreen: boolean;
};

export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export type itemPerPageSelectorProps = {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  options: number[];
};

export type CategoryProps = {
  id: number;
  name: string;
  productsIds: number[];
  createdAt: string;
};
