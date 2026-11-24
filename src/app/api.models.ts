export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  badgeType: 'offer' | 'stock';
  badgeText: string;
  shortSpecs: string;
  fullDescription: string;
  specsList: string[];
  image: string;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
  couponCode?: string;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  status: 'pending';
  subtotal: number;
  discount: number;
  total: number;
}

export interface CouponResponse {
  code: string;
  discountPercent: number;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  message: string;
}
