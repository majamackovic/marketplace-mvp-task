import { Component, inject, Signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, catchError, of } from 'rxjs';
import { AdsService } from '../../services/ads.service';
import { Ad } from '../../interfaces/ad.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ad-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './ad-details.component.html',
})
export class AdDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly adsService = inject(AdsService);

  readonly ad: Signal<Ad | null | undefined> = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return id ? this.adsService.getAdById(id) : of(null);
      }),
      catchError(() => of(null))
    ),
    { initialValue: undefined }
  );
}

