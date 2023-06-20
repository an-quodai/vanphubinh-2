enum ItemType {
  PRODUCT = "product",
  SERVICE = "service",
  MOULD = "mould",
}

interface Uom {
  id: number;
  name: string;
}
interface Category {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  name: string;
  uom: Uom;
  purchaseUom: Uom;
  price: number;
  cost: number;
  category: Category;
  type: ItemType;
}

export interface Partner {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  isCustomer: boolean;
  isSupplier: boolean;
}

export interface SaleOrderLine {
  id: number;
  item: Item;
  quantity: number;
  unitPrice: number;
  discount: number;
}
export interface SaleOrder {
  id: number;
  customer: Partner;
  discount: number;
  status: string;
  saleOrderLines: SaleOrderLine[];
}
