import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { afterEach } from 'vitest';
import { ApiService } from './api.service';
import { Product } from './api.models';
import { App } from './app';

const products: Product[] = [
  {
    id: 1,
    name: 'PC Gamer Ares G1',
    category: 'PC Gamer',
    price: 5499,
    oldPrice: 6499,
    badgeType: 'offer',
    badgeText: '-15% OFF',
    shortSpecs: 'RTX 4060 • 16GB RAM',
    fullDescription: 'PC de teste.',
    specsList: ['RTX 4060'],
    image: 'https://example.test/pc.jpg',
  },
  {
    id: 2,
    name: 'Notebook Orion 14',
    category: 'Notebooks',
    price: 3590,
    oldPrice: null,
    badgeType: 'stock',
    badgeText: 'EM ESTOQUE',
    shortSpecs: 'Ryzen 7 • SSD 512GB',
    fullDescription: 'Notebook de teste.',
    specsList: ['Ryzen 7'],
    image: 'https://example.test/notebook.jpg',
  },
  {
    id: 3,
    name: 'Notebook Zephyrus Pro',
    category: 'Notebooks',
    price: 6890,
    oldPrice: null,
    badgeType: 'stock',
    badgeText: 'EM ESTOQUE',
    shortSpecs: 'Core i7 • RTX 4060',
    fullDescription: 'Notebook de teste.',
    specsList: ['Core i7'],
    image: 'https://example.test/notebook-pro.jpg',
  },
];

const api = {
  getProducts: () => of(products),
  validateCoupon: () => of({ code: 'GAME10', discountPercent: 10 }),
  createOrder: () => of({
    id: 'test-order',
    orderNumber: 'GHQ-TEST',
    status: 'pending' as const,
    subtotal: 5499,
    discount: 0,
    total: 5499,
  }),
  sendContact: () => of({ id: 'test-contact', message: 'Mensagem recebida.' }),
};

describe('App', () => {
  afterEach(() => vi.restoreAllMocks());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: ApiService, useValue: api }],
    }).compileComponents();
  });

  it('should render and filter products loaded from the API', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ELEVE O NÍVEL DO SEU JOGO');
    expect(compiled.querySelectorAll('.ghq-product-card')).toHaveLength(3);

    const categoryButtons = compiled.querySelectorAll<HTMLButtonElement>('.ghq-filter-btn');
    categoryButtons[2].click();
    await fixture.whenStable();

    expect(compiled.querySelectorAll('.ghq-product-card')).toHaveLength(2);
  });

  it('should apply the server-validated coupon to the cart total', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();

    app.addToCart(products[0]);
    app.couponInput = 'GAME10';
    await app.applyCoupon();

    expect(app.subtotal).toBe(5499);
    expect(app.discount).toBeCloseTo(549.9);
    expect(app.total).toBeCloseTo(4949.1);
  });

  it('should display an error returned by the API when loading the catalog fails', async () => {
    vi.spyOn(api, 'getProducts').mockReturnValue(throwError(() => new HttpErrorResponse({
      status: 503,
      error: { error: { code: 'UNAVAILABLE', message: 'Catálogo temporariamente indisponível.' } },
    })));

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent)
      .toContain('Catálogo temporariamente indisponível.');
  });
});
