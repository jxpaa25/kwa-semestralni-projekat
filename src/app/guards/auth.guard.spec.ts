import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { users } from '../../db/users.db';

describe('authGuard', () => {
  const route = {} as ActivatedRouteSnapshot;
  const state = {} as RouterStateSnapshot;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('blocks navigation when nobody is logged in', () => {
    const result = TestBed.runInInjectionContext(() => authGuard(route, state));
    expect(result).toBe(false);
  });

  it('allows navigation when a user is logged in', () => {
    TestBed.inject(AuthService).trenutniKorisnik.set(users[0]);
    const result = TestBed.runInInjectionContext(() => authGuard(route, state));
    expect(result).toBe(true);
  });
});
