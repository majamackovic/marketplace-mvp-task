import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { AdsClient } from '../clients/ads.client';
import { Ad, CreateAdRequest } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private readonly adsClient = inject(AdsClient);
  private _ads = new BehaviorSubject<Ad[]>([]);
  public ads$ = this._ads.asObservable();

  constructor() {
    this.getAds();
  }

  getAds(): void {
    this.adsClient
      .getAds()
      .pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
      )
      .subscribe((ads) => {
        this._ads.next(ads);
      });
  }

  getAdById(id: string): Observable<Ad> {
    return this.adsClient.getAdById(id);
  }

  createAd(payload: CreateAdRequest): Observable<Ad> {
    return this.adsClient.createAd(payload).pipe(
      tap((created) => {
        const current = this._ads.getValue();
        this._ads.next([created, ...current]);
      }),
    );
  }
}
