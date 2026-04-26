import { Injectable, signal } from '@angular/core';
import { User, users } from '../../db/users.db';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = users;
  
  public trenutniKorisnik = signal<User | null>(null);

  constructor() {
    const storedSession = localStorage.getItem('currentUser');
    if (storedSession) {
      this.trenutniKorisnik.set(JSON.parse(storedSession));
    }
  }

  private saveState() {
    if (this.trenutniKorisnik()) {
      localStorage.setItem('currentUser', JSON.stringify(this.trenutniKorisnik()));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  register(user: User): boolean {
    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      return false;
    }
    
    user.id = this.users.length > 0 ? Math.max(...this.users.map(u => u.id || 0)) + 1 : 1;
    this.users.push(user);
    this.saveState();
    return true;
  }

  login(email: string, password?: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.trenutniKorisnik.set(user);
      this.saveState();
      return true;
    }
    return false;
  }

  logout(): void {
    this.trenutniKorisnik.set(null);
    this.saveState();
  }

  updateProfile(updatedUser: User): boolean {
    const currentUser = this.trenutniKorisnik();
    if (!currentUser) return false;

    const index = this.users.findIndex(u => u.id === currentUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
      this.trenutniKorisnik.set(this.users[index]);
      this.saveState();
      return true;
    }
    return false;
  }
}
