import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product, PRODUCTS } from './products';

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
export class App {
  readonly products = PRODUCTS;
  readonly categories = ['Todos', 'PC Gamer', 'Notebooks', 'Smartphones', 'Jogos & Consoles'];
  readonly currentYear = new Date().getFullYear();

  activeCategory = 'Todos';
  searchQuery = '';
  cartOpen = false;
  mobileMenuOpen = false;
  selectedProduct: Product | null = null;
  cart: CartItem[] = [];
  couponInput = '';
  couponFeedback = '';
  couponApplied = false;
  checkoutFeedback = '';
  toastMessage = '';
  contactSubmitted = false;
  contactFeedback = '';
  contactFeedbackIsError = false;
  contact = { name: '', email: '', phone: '', subject: '', message: '' };
  private readonly changeDetector = inject(ChangeDetectorRef);
  private toastTimeout?: ReturnType<typeof setTimeout>;

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

  get subtotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  get discount(): number {
    return this.couponApplied ? this.subtotal * 0.1 : 0;
  }

  get total(): number {
    return Math.max(0, this.subtotal - this.discount);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  addToCart(product: Product): void {
    const item = this.cart.find((cartItem) => cartItem.product.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    this.checkoutFeedback = '';
    this.selectedProduct = null;
    this.showToast(`${product.name} adicionado ao carrinho.`);
  }

  updateCartQuantity(productId: number, delta: number): void {
    const item = this.cart.find((cartItem) => cartItem.product.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    }
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((item) => item.product.id !== productId);
  }

  applyCoupon(): void {
    const code = this.couponInput.trim().toUpperCase();
    this.couponApplied = code === 'GAME10';
    this.couponFeedback = this.couponApplied
      ? 'Cupom GAME10 aplicado com sucesso (10% de desconto).'
      : code
        ? 'Cupom inválido. Utilize o código GAME10.'
        : 'Digite um código de cupom válido (ex: GAME10).';
  }

  checkout(): void {
    if (this.cart.length === 0) return;

    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    this.checkoutFeedback = `Pedido #${orderNumber} registrado com sucesso! Nossa equipe enviará os detalhes de pagamento e entrega para o seu contato.`;
    this.cart = [];
    this.couponInput = '';
    this.couponFeedback = '';
    this.couponApplied = false;
  }

  openProductDetails(product: Product): void {
    this.selectedProduct = product;
  }

  resetFilters(): void {
    this.activeCategory = 'Todos';
    this.searchQuery = '';
  }

  onImageError(event: Event): void {
    const image = event.target;
    if (image instanceof HTMLImageElement && !image.src.includes('placehold.co')) {
      image.src = 'https://placehold.co/600x400/0B0E14/FFFFFF?text=GAME+HQ';
    }
  }

  submitContact(form: NgForm): void {
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

    this.contactFeedback = 'Mensagem enviada com sucesso! Nossa equipe responderá em breve.';
    this.contactFeedbackIsError = false;
    this.contactSubmitted = false;
    form.resetForm();
    this.contact = { name: '', email: '', phone: '', subject: '', message: '' };
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
