import { AuthService } from './auth.service';
import { User, users } from '../../db/users.db';

const seed = users[0];

function newUser(email: string): User {
  return {
    ime: 'Test',
    prezime: 'Korisnik',
    email,
    telefon: '+381600000000',
    adresa: 'Test 1',
    omiljeneVrsteIgracaka: ['Slagalica'],
    password: 'lozinka123',
  };
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    service = new AuthService();
  });

  it('starts with no user logged in', () => {
    expect(service.trenutniKorisnik()).toBeNull();
  });

  it('logs in a seed user with the correct password and persists the session', () => {
    expect(service.login(seed.email, seed.password)).toBe(true);
    expect(service.trenutniKorisnik()?.email).toBe(seed.email);
    expect(JSON.parse(localStorage.getItem('currentUser')!).id).toBe(seed.id);
  });

  it('rejects a wrong password and an unknown email', () => {
    expect(service.login(seed.email, 'wrong')).toBe(false);
    expect(service.login('nobody@example.com', seed.password)).toBe(false);
    expect(service.trenutniKorisnik()).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('restores the session from localStorage on construction', () => {
    service.login(seed.email, seed.password);
    const fresh = new AuthService();
    expect(fresh.trenutniKorisnik()?.id).toBe(seed.id);
  });

  it('logs out and clears the stored session', () => {
    service.login(seed.email, seed.password);
    service.logout();
    expect(service.trenutniKorisnik()).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('registers a new user with a fresh id and allows logging in', () => {
    const user = newUser('nova@osoba.com');
    const maxId = Math.max(...users.map((u) => u.id ?? 0));

    expect(service.register(user)).toBe(true);
    expect(user.id).toBe(maxId + 1);
    expect(service.login(user.email, user.password)).toBe(true);
  });

  it('refuses to register an email that is already taken', () => {
    expect(service.register(newUser(seed.email))).toBe(false);
  });

  it('updates the profile of the logged-in user and keeps the session in sync', () => {
    const user = newUser('profil@osoba.com');
    service.register(user);
    service.login(user.email, user.password);

    const ok = service.updateProfile({ ...user, adresa: 'Nova adresa 5', telefon: '+381611111111' });

    expect(ok).toBe(true);
    expect(service.trenutniKorisnik()?.adresa).toBe('Nova adresa 5');
    expect(service.trenutniKorisnik()?.telefon).toBe('+381611111111');
    expect(JSON.parse(localStorage.getItem('currentUser')!).adresa).toBe('Nova adresa 5');
  });

  it('does not update a profile when nobody is logged in', () => {
    expect(service.updateProfile(newUser(seed.email))).toBe(false);
  });
});
