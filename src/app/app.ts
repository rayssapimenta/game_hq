import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ApiService, getApiErrorMessage } from './api.service';
import { Product } from './api.models';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly categories = ['Todos', 'PC Gamer', 'Notebooks', 'Smartphones', 'Jogos & Consoles'];
  readonly currentYear = new Date().getFullYear();

  products: Product[] = [];
  productsLoading = true;
  productsError = '';
  activeCategory = 'Todos';
  searchQuery = '';
  cartOpen = false;
  mobileMenuOpen = false;
  selectedProduct: Product | null = null;
  cart: CartItem[] = [];
  couponInput = '';
  couponFeedback = '';
  couponApplied = false;
  appliedCouponCode = '';
  discountPercent = 0;
  couponLoading = false;
  checkoutFeedback = '';
  checkoutFeedbackIsError = false;
  checkoutLoading = false;
  toastMessage = '';
  contactSubmitted = false;
  contactFeedback = '';
  contactFeedbackIsError = false;
  contactSubmitting = false;
  contact = { name: '', email: '', phone: '', subject: '', message: '' };
  private readonly api = inject(ApiService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private toastTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    void this.loadProducts();
  }

  get filteredProducts(): Product[] {
    const query = this.searchQuery.trim().toLowerCase();
    return this.products.filter((product) => {
      const matchesCategory =
        this.activeCategory === 'Todos' || product.category === this.activeCategory;
      const searchableText = `${product.name} ${product.shortSpecs} ${product.category}`.toLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }

  get cartCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartQuantity(productId: number): number {
    return this.cart.find((item) => item.product.id === productId)?.quantity ?? 0;
  }

  get subtotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  get discount(): number {
    return this.couponApplied
      ? Math.round(this.subtotal * this.discountPercent) / 100
      : 0;
  }

  get total(): number {
    return Math.max(0, this.subtotal - this.discount);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  async loadProducts(): Promise<void> {
    this.productsLoading = true;
    this.productsError = '';
    try {
      this.products = await firstValueFrom(this.api.getProducts());
    } catch (error) {
      this.productsError = getApiErrorMessage(
        error,
        'Não foi possível carregar o catálogo. Tente novamente.',
      );
    } finally {
      this.productsLoading = false;
    }
  }

  addToCart(product: Product): void {
    if (this.checkoutLoading) return;
    const item = this.cart.find((cartItem) => cartItem.product.id === product.id);
    if (item) {
      if (item.quantity >= 10) return;
      item.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    this.checkoutFeedback = '';
    this.selectedProduct = null;
    this.showToast(`${product.name} adicionado ao carrinho.`);
  }

  updateCartQuantity(productId: number, delta: number): void {
    if (this.checkoutLoading) return;
    const item = this.cart.find((cartItem) => cartItem.product.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    }
  }

  removeFromCart(productId: number): void {
    if (this.checkoutLoading) return;
    this.cart = this.cart.filter((item) => item.product.id !== productId);
  }

  async applyCoupon(): Promise<void> {
    if (this.checkoutLoading) return;
    this.couponLoading = true;
    this.couponFeedback = '';
    this.couponApplied = false;
    this.discountPercent = 0;
    this.appliedCouponCode = '';
    try {
      const response = await firstValueFrom(this.api.validateCoupon(this.couponInput));
      this.couponApplied = true;
      this.appliedCouponCode = response.code;
      this.discountPercent = response.discountPercent;
      this.couponFeedback = `Cupom ${response.code} aplicado com sucesso (${response.discountPercent}% de desconto).`;
    } catch (error) {
      this.couponApplied = false;
      this.appliedCouponCode = '';
      this.discountPercent = 0;
      this.couponFeedback = getApiErrorMessage(error, 'Não foi possível validar o cupom.');
    } finally {
      this.couponLoading = false;
    }
  }

  async checkout(): Promise<void> {
    if (this.cart.length === 0 || this.checkoutLoading) return;

    this.checkoutLoading = true;
    this.checkoutFeedback = '';
    try {
      const order = await firstValueFrom(this.api.createOrder({
        items: this.cart.map(({ product, quantity }) => ({
          productId: product.id,
          quantity,
        })),
        couponCode: this.couponApplied ? this.appliedCouponCode : '',
      }));
      this.checkoutFeedback =
        `Pedido #${order.orderNumber} registrado no servidor. Total confirmado: ${this.formatCurrency(order.total)}. Nenhum pagamento foi processado.`;
      this.checkoutFeedbackIsError = false;
      this.cart = [];
      this.couponInput = '';
      this.couponFeedback = '';
      this.couponApplied = false;
      this.appliedCouponCode = '';
      this.discountPercent = 0;
    } catch (error) {
      this.checkoutFeedbackIsError = true;
      this.checkoutFeedback = getApiErrorMessage(
        error,
        'Não foi possível registrar o pedido. Tente novamente.',
      );
    } finally {
      this.checkoutLoading = false;
    }
  }

  openProductDetails(product: Product): void {
    this.selectedProduct = product;
  }

  resetFilters(): void {
    this.activeCategory = 'Todos';
    this.searchQuery = '';
  }

  couponInputChanged(): void {
    if (this.couponInput.trim().toUpperCase() !== this.appliedCouponCode) {
      this.couponApplied = false;
      this.appliedCouponCode = '';
      this.discountPercent = 0;
      this.couponFeedback = '';
    }
  }

  onImageError(event: Event): void {
    const image = event.target;
    if (image instanceof HTMLImageElement && !image.src.includes('placehold.co')) {
      image.src = 'https://placehold.co/600x400/0B0E14/FFFFFF?text=GAME+HQ';
    }
  }

  async submitContact(form: NgForm): Promise<void> {
    this.contactSubmitted = true;
    if (
      !this.isContactNameValid() ||
      !this.isContactEmailValid() ||
      !this.contact.subject ||
      !this.isContactMessageValid()
    ) {
      this.contactFeedback = 'Revise os campos destacados antes de enviar sua mensagem.';
      this.contactFeedbackIsError = true;
      return;
    }

    this.contactSubmitting = true;
    this.contactFeedback = '';
    try {
      const response = await firstValueFrom(this.api.sendContact(this.contact));
      this.contactFeedback = response.message;
      this.contactFeedbackIsError = false;
      this.contactSubmitted = false;
      form.resetForm();
      this.contact = { name: '', email: '', phone: '', subject: '', message: '' };
    } catch (error) {
      this.contactFeedbackIsError = true;
      this.contactFeedback = getApiErrorMessage(
        error,
        'Não foi possível enviar sua mensagem. Tente novamente.',
      );
    } finally {
      this.contactSubmitting = false;
    }
  }

  isContactNameValid(): boolean {
    return this.contact.name.trim().length >= 3;
  }

  isContactEmailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.contact.email.trim());
  }

  isContactMessageValid(): boolean {
    return this.contact.message.trim().length >= 10;
  }

  dismissToast(): void {
    this.toastMessage = '';
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
      this.changeDetector.markForCheck();
    }, 2600);
  }
}
