import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { users } from '../../../db/users.db';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function submitButton(): HTMLButtonElement {
    return (fixture.nativeElement as HTMLElement).querySelector('button[type="submit"]')!;
  }

  it('starts with an invalid form and a disabled submit button', () => {
    expect(component.loginForm.invalid).toBe(true);
    expect(submitButton().disabled).toBe(true);
  });

  it('requires a valid email and a password of at least six characters', () => {
    component.loginForm.setValue({ email: 'not-an-email', password: '123' });
    expect(component.loginForm.get('email')?.hasError('email')).toBe(true);
    expect(component.loginForm.get('password')?.hasError('minlength')).toBe(true);

    component.loginForm.setValue({ email: 'a@b.com', password: '123456' });
    expect(component.loginForm.valid).toBe(true);
  });

  it('shows an error message on wrong credentials and does not navigate', () => {
    component.loginForm.setValue({ email: users[0].email, password: 'pogresna' });
    component.onSubmit();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Pogrešan email ili lozinka.');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Pogrešan email ili lozinka.');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('logs in and redirects to the catalog on correct credentials', () => {
    component.loginForm.setValue({ email: users[0].email, password: users[0].password });
    component.onSubmit();

    expect(TestBed.inject(AuthService).trenutniKorisnik()?.id).toBe(users[0].id);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.errorMessage).toBe('');
  });
});
