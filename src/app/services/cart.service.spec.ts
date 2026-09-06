import { CartService } from './cart.service';
import { toys } from '../../db/toys.db';

const [toyA, toyB] = toys;

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    service = new CartService();
  });

  it('starts empty', () => {
    expect(service.items()).toEqual([]);
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });

  it('adds a toy and increments the quantity when the same toy is added again', () => {
    service.addToCart(toyA);
    service.addToCart(toyA);
    service.addToCart(toyB);

    expect(service.items().length).toBe(2);
    expect(service.items()[0].quantity).toBe(2);
    expect(service.totalItems()).toBe(3);
    expect(service.totalPrice()).toBe(toyA.price * 2 + toyB.price);
  });

  it('updates the quantity of an item', () => {
    service.addToCart(toyA);
    service.updateQuantity(toyA.toyId, 5);
    expect(service.items()[0].quantity).toBe(5);
    expect(service.totalPrice()).toBe(toyA.price * 5);
  });

  it('removes an item when its quantity drops to zero', () => {
    service.addToCart(toyA);
    service.updateQuantity(toyA.toyId, 0);
    expect(service.items()).toEqual([]);
  });

  it('removes an item by id', () => {
    service.addToCart(toyA);
    service.addToCart(toyB);
    service.removeFromCart(toyA.toyId);
    expect(service.items().map((i) => i.toy.toyId)).toEqual([toyB.toyId]);
  });

  it('clears the cart', () => {
    service.addToCart(toyA);
    service.clearCart();
    expect(service.items()).toEqual([]);
    expect(JSON.parse(localStorage.getItem('cart')!)).toEqual([]);
  });

  it('persists to localStorage and restores on construction', () => {
    service.addToCart(toyA);
    service.addToCart(toyA);

    const fresh = new CartService();
    expect(fresh.totalItems()).toBe(2);
    expect(fresh.items()[0].toy.toyId).toBe(toyA.toyId);
  });
});
