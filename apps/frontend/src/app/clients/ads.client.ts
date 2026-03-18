import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad, CreateAdRequest } from '../interfaces';

const API_BASE = '/api';

@Injectable({
  providedIn: 'root',
})
export class AdsClient {
  private http = inject(HttpClient);

  getAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${API_BASE}/ads`);
  }

  getAdById(id: string): Observable<Ad> {
    return this.http.get<Ad>(`${API_BASE}/ads/${id}`);
  }

  createAd(payload: CreateAdRequest): Observable<Ad> {
    return this.http.post<Ad>(`${API_BASE}/ads`, payload);
  }
}
