import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdsService } from './ads.service';
import { Ad } from '../../clients/ads.client';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgOptimizedImage],
  templateUrl: './ads-list.component.html',
})
export class AdsListComponent {
  private readonly adsService = inject(AdsService);

  public readonly ads: Signal<Ad[]>;

  constructor() {
    this.ads = toSignal(this.adsService.ads$, {
      initialValue: [] as Ad[],
    });
  }

}

