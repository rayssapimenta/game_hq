import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the catalog and filter products by category', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ELEVE O NÍVEL DO SEU JOGO');
    expect(compiled.querySelectorAll('.ghq-product-card')).toHaveLength(8);

    const categoryButtons = compiled.querySelectorAll<HTMLButtonElement>('.ghq-filter-btn');
    categoryButtons[2].click();
    await fixture.whenStable();

    expect(compiled.querySelectorAll('.ghq-product-card')).toHaveLength(2);
  });

  it('should calculate the GAME10 discount on the cart total', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.cart.push({ product: app.products[0], quantity: 1 });
    app.couponInput = 'GAME10';
    app.applyCoupon();

    expect(app.subtotal).toBe(5499);
    expect(app.discount).toBeCloseTo(549.9);
    expect(app.total).toBeCloseTo(4949.1);
  });
});
