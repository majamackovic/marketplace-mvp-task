import { Component, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdsService } from '../../services/ads.service';
import { Ad } from '../../clients/ads.client';
import { CategoriesClient, Category } from '../../clients/categories.client';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    NgOptimizedImage,
    OverlayModule,
    RouterModule,
  ],
  templateUrl: './ads-list.component.html',
})
export class AdsListComponent {
  private readonly adsService = inject(AdsService);
  private readonly categoriesClient = inject(CategoriesClient);

  public readonly ads: Signal<Ad[]>;
  public readonly categories: Signal<Category[]>;
  public readonly isDropdownOpen = signal(false);

  public readonly searchQuery = signal('');
  public readonly selectedCategories = signal<string[]>([]);

  public readonly filteredAds = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const selected = this.selectedCategories();
    const hasCategoryFilter = selected.length > 0;

    return this.ads().filter((ad) => {
      const matchesQuery =
        !query ||
        ad.title.toLowerCase().includes(query) ||
        ad.description.toLowerCase().includes(query);

      const matchesCategory =
        !hasCategoryFilter || selected.includes(ad.categoryId);

      return matchesQuery && matchesCategory;
    });
  });

  constructor() {
    this.ads = toSignal(this.adsService.ads$, {
      initialValue: [] as Ad[],
    });

    this.categories = toSignal(this.categoriesClient.getCategories(), {
      initialValue: [] as Category[],
    });
  }

  handleSearch(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.searchQuery.set(target?.value ?? '');
  }

  handleCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (!target) {
      this.selectedCategories.set([]);
      return;
    }

    const values = Array.from(target.selectedOptions).map(
      (option) => option.value,
    );

    this.selectedCategories.set(values);
  }

  toggleCategory(id: string) {
    this.selectedCategories.update((current) =>
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    );
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategories.set([]);
  }
}
