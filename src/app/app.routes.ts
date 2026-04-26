import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'toy/:permalink',
        loadComponent: () => import('./pages/toy-detail/toy-detail.component').then(m => m.ToyDetailComponent)
    },
    {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
    },
];
