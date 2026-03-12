import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AdCategory {
  id: string;
  name: string;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  location: string;
  images?: string[];
  categoryId: string;
  authorId: string;
  category: AdCategory;
  createdAt: string;
  updatedAt: string;
}

const API_BASE = '/api';

@Injectable({
  providedIn: 'root',
})
export class AdsClient {
  private http = inject(HttpClient);

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${API_BASE}/ads`);
  }
}

