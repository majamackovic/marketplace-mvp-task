import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces';

const API_BASE = '/api';

@Injectable({
  providedIn: 'root',
})
export class CategoriesClient {
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_BASE}/categories`);
  }
}

