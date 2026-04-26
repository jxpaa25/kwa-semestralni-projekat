import { Injectable, signal } from '@angular/core';
import { User } from '../../db/users.db';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      ime: "Petar",
      prezime: "Petrovic",
      email: "petar@petrovic.com",
      telefon: "+381098765432",
      adresa: "CBA 321",
      omiljeneVrsteIgracaka: ["Slagalica", "Slikovnica", "Figura", "Kreativni set", "Vozilo", "Plišana igračka", "Društvena igra", "Konstruktorski set"],
      password: "petar123"
    },
    {
      id: 2,
      ime: "Jovan",
      prezime: "Jovanovic",
      email: "jovan@jovanovic.com",
      telefon: "+381069555333",
      adresa: "AAA 111",
      omiljeneVrsteIgracaka: ["Slagalica", "Slikovnica", "Figura", "Kreativni set", "Vozilo", "Plišana igračka", "Društvena igra", "Konstruktorski set"],
      password: "jovan123"
    },
    {
      id: 3,
      ime: "Marko",
      prezime: "Markovic",
      email: "marko@markovic.com",
      telefon: "+38169123456",
      adresa: "BBB 222",
      omiljeneVrsteIgracaka: ["Slagalica", "Slikovnica", "Figura", "Kreativni set", "Vozilo", "Plišana igračka", "Društvena igra", "Konstruktorski set"],
      password: "marko123"
    },
    {
      id: 4,
      ime: "Stefan",
      prezime: "Stefanovic",
      email: "stefan@stefanovic.com",
      telefon: "+38169654321",
      adresa: "CCC 333",
      omiljeneVrsteIgracaka: ["Slagalica", "Slikovnica", "Figura", "Kreativni set", "Vozilo", "Plišana igračka", "Društvena igra", "Konstruktorski set"],
      password: "stefan123"
    }
  ];
  
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
