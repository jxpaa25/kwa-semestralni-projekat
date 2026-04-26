import { Injectable, signal, computed } from '@angular/core';
import { Toy } from '../../db/toys.db';

export interface CartItem {
  toy: Toy;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  // Selectors
  public items = computed(() => this.cartItems());
  public totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  public totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + (item.toy.price * item.quantity), 0));

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems.set(JSON.parse(storedCart));
    }
  }

  private saveState() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  addToCart(toy: Toy): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(i => i.toy.toyId === toy.toyId);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.set([...currentItems]);
    } else {
      this.cartItems.set([...currentItems, { toy, quantity: 1 }]);
    }
    this.saveState();
  }

  removeFromCart(toyId: number): void {
    this.cartItems.set(this.cartItems().filter(i => i.toy.toyId !== toyId));
    this.saveState();
  }

  updateQuantity(toyId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(toyId);
      return;
    }
    
    const currentItems = this.cartItems();
    const item = currentItems.find(i => i.toy.toyId === toyId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set([...currentItems]);
      this.saveState();
    }
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.saveState();
  }
}
