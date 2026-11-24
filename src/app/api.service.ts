import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ContactRequest,
  ContactResponse,
  CouponResponse,
  CreateOrderRequest,
  OrderResponse,
  Product,
} from './api.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  validateCoupon(code: string): Observable<CouponResponse> {
    return this.http.post<CouponResponse>('/api/coupons/validate', { code });
  }

  createOrder(order: CreateOrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>('/api/orders', order);
  }

  sendContact(contact: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>('/api/contact', contact);
  }
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof HttpErrorResponse)) return fallback;
  if (error.status === 0) return 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';

  const response = error.error;
  if (typeof response === 'object' && response !== null && 'error' in response) {
    const apiError = response.error;
    if (
      typeof apiError === 'object' &&
      apiError !== null &&
      'message' in apiError &&
      typeof apiError.message === 'string'
    ) {
      return apiError.message;
    }
  }

  return fallback;
}
