export type ProductType = {
  type?: 'product';
  id: number;
  name: string;
  description: string[];
  image: string[];
  price: number;
  categoryId: string[];
  productId: string;
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
  type?: 'category';
  id: number;
  name: string;
  productsIds: string[];
  createdAt: string;
};

export type VariantProps = {
  id: number;
  productId: string;
  colors: Color[];
};

export type ProductWithVariant = ProductType & {
  variant: VariantProps;
};

export type UpdateCategoryData = {
  name?: string;
  productIds?: string[];
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

export type DataType = ProductType | CategoryProps;
