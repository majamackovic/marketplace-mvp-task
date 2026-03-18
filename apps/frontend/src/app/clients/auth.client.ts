import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../interfaces';

const API_BASE = '/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  private http = inject(HttpClient);

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE}/register`, data);
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE}/login`, credentials);
  }

  me(): Observable<User> {
    return this.http.get<User>(`${API_BASE}/me`);
  }
}

