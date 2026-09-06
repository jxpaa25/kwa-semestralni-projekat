import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { toys } from '../db/toys.db';
import { users } from '../db/users.db';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the brand link', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('ToyStore');
  });

  it('shows login and register links when nobody is logged in', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a[href="/login"]')).not.toBeNull();
    expect(el.querySelector('a[href="/register"]')).not.toBeNull();
    expect(el.querySelector('a[href="/cart"]')).toBeNull();
  });

  it('shows the user name, cart link and logout button when logged in', () => {
    const auth = TestBed.inject(AuthService);
    auth.trenutniKorisnik.set(users[0]);

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain(`${users[0].ime} ${users[0].prezime}`);
    expect(el.querySelector('a[href="/cart"]')).not.toBeNull();
    expect(el.querySelector('a[href="/login"]')).toBeNull();
    expect(el.querySelector('button')?.textContent).toContain('Odjavi se');
  });

  it('shows the cart badge with the item count', () => {
    TestBed.inject(AuthService).trenutniKorisnik.set(users[0]);
    const cart = TestBed.inject(CartService);
    cart.addToCart(toys[0]);
    cart.addToCart(toys[0]);
    cart.addToCart(toys[1]);

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const badge = (fixture.nativeElement as HTMLElement).querySelector('a[href="/cart"] span');
    expect(badge?.textContent?.trim()).toBe('3');
  });

  it('logs the user out when the logout button is clicked', () => {
    const auth = TestBed.inject(AuthService);
    auth.trenutniKorisnik.set(users[0]);

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    (fixture.nativeElement as HTMLElement).querySelector('button')!.click();
    fixture.detectChanges();

    expect(auth.trenutniKorisnik()).toBeNull();
    expect((fixture.nativeElement as HTMLElement).querySelector('a[href="/login"]')).not.toBeNull();
  });
});
