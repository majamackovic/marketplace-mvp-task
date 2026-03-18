import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthClient } from '../clients/auth.client';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../interfaces';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authClient = inject(AuthClient);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  
  readonly currentUser = signal<User | null>(null);

  constructor() {
    const token =
      typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null;

    if (token) {
      this.refreshCurrentUser().subscribe();
    }
  }

  refreshCurrentUser(): Observable<User | null> {
    return this.authClient.me().pipe(
      tap((user) => this.currentUser.set(user)),
      catchError(() => {
        localStorage.removeItem('access_token');
        this.currentUser.set(null);
        return of(null);
      }),
    );
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.authClient.login(credentials).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.access_token);
        this.currentUser.set(response.user);
        this.router.navigate(['/']);
      }),
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.authClient.register(data).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.access_token);
        this.currentUser.set(response.user);
        this.router.navigate(['/']);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
    this.toastr.success('Logged out successfully');
  }
}

