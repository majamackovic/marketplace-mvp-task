import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Ad, AdsClient } from '../../clients/ads.client';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  private readonly adsClient = inject(AdsClient);
  private _ads = new BehaviorSubject<Ad[]> ([]);
  public ads$ = this._ads.asObservable();

  constructor() {
    this.getAds();
  }

  getAds(): void {
    this.adsClient.getAds().pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    ).subscribe((ads) => {
      this._ads.next(ads);
    });
  }
}

