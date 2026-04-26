import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  protected cartService = inject(CartService);

  removeItem(toyId: number) {
    this.cartService.removeFromCart(toyId);
  }

  incrementQuantity(toyId: number, currentQuantity: number) {
    this.cartService.updateQuantity(toyId, currentQuantity + 1);
  }

  decrementQuantity(toyId: number, currentQuantity: number) {
    this.cartService.updateQuantity(toyId, currentQuantity - 1);
  }

  checkout() {
    alert('Vaša porudžbina je uspešno primljena.');
    this.cartService.clearCart();
  }
}
