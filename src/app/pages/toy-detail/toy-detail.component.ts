import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToyService } from '../../services/toy.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Toy } from '../../../db/toys.db';
import { users } from '../../../db/users.db';

@Component({
  selector: 'app-toy-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './toy-detail.component.html'
})
export class ToyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toyService = inject(ToyService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  toy: Toy | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const permalink = params.get('permalink');
      this.toy = this.toyService.getToyByPermalink(permalink || '');
    });
  }

  addToCart(toy: Toy): void {
    if (!this.authService.trenutniKorisnik()) {
      alert('Morate biti prijavljeni da biste dodali artikle u korpu.');
      this.router.navigate(['/login']);
      return;
    }
    
    this.cartService.addToCart(toy);
    alert("Artikal uspešno dodat u korpu.")
  }

  getAuthorName(authorId: number): string {
    const user = users.find(u => u.id === authorId);
    return user ? `${user.ime} ${user.prezime}` : 'Nepoznat autor';
  }
}
