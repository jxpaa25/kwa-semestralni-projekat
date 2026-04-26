import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../db/users.db';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  private router = inject(Router);

  isEditMode = false;
  availableToyTypes = [
    'Slagalica',
    'Slikovnica',
    'Figura',
    'Kreativni set',
    'Vozilo',
    'Plišana igračka',
    'Društvena igra',
    'Konstruktorski set',
    'Muzička igračka',
    'Edukativna igračka'
  ];

  registerForm: FormGroup = this.fb.group({
    ime: ['', Validators.required],
    prezime: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefon: ['', Validators.required],
    adresa: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    omiljeneVrsteIgracaka: this.fb.array([])
  });

  errorMessage: string = '';
  successMessage: string = '';

  get omiljeneVrsteIgracaka() {
    return this.registerForm.get('omiljeneVrsteIgracaka') as FormArray;
  }

  ngOnInit() {
    const currentUser = this.authService.trenutniKorisnik();
    if (currentUser) {
      this.isEditMode = true;
      
      this.registerForm.get('password')?.clearValidators();
      this.registerForm.get('password')?.setValidators([Validators.minLength(6)]);
      this.registerForm.get('password')?.updateValueAndValidity();

      this.registerForm.patchValue({
        ime: currentUser.ime,
        prezime: currentUser.prezime,
        email: currentUser.email,
        telefon: currentUser.telefon,
        adresa: currentUser.adresa
      });

      this.availableToyTypes.forEach(type => {
        if (currentUser.omiljeneVrsteIgracaka?.includes(type)) {
          this.omiljeneVrsteIgracaka.push(new FormControl(type));
        }
      });
    }
  }

  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.omiljeneVrsteIgracaka.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.omiljeneVrsteIgracaka.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.omiljeneVrsteIgracaka.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  isChecked(type: string): boolean {
    return this.omiljeneVrsteIgracaka.value.includes(type);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      const formValue = this.registerForm.value;
      
      const userData: User = {
        ime: formValue.ime,
        prezime: formValue.prezime,
        email: formValue.email,
        telefon: formValue.telefon,
        adresa: formValue.adresa,
        omiljeneVrsteIgracaka: formValue.omiljeneVrsteIgracaka
      };

      if (formValue.password) {
        userData.password = formValue.password;
      }

      if (this.isEditMode) {
        const success = this.authService.updateProfile(userData);
        if (success) {
          this.successMessage = 'Profil je uspešno ažuriran!';
        } else {
          this.errorMessage = 'Greška pri ažuriranju profila.';
        }
      } else {
        const success = this.authService.register(userData as User);
        if (success) {
          this.authService.login(userData.email, userData.password); // Auto-login
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Email adresa je već u upotrebi.';
        }
      }
    }
  }
}
