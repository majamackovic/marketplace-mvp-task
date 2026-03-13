import { ChangeDetectionStrategy, Component, Signal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AdsService } from '../../services/ads.service';
import { CategoriesClient, Category } from '../../clients/categories.client';
import { CreateAdRequest } from '../../clients/ads.client';

@Component({
  selector: 'app-ad-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ad-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly adsService = inject(AdsService);
  private readonly categoriesClient = inject(CategoriesClient);

  readonly categories: Signal<Category[]>;
  readonly isSubmitting = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(25)]],
    description: ['', [Validators.required]],
    price: [1, [Validators.required, Validators.min(1)]],
    currency: ['RSD', [Validators.required]],
    categoryId: ['', [Validators.required]],
  });

  constructor() {
    this.categories = toSignal(this.categoriesClient.getCategories(), {
      initialValue: [] as Category[],
    });
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get price() {
    return this.form.get('price');
  }

  get currency() {
    return this.form.get('currency');
  }

  get categoryId() {
    return this.form.get('categoryId');
  }

  handleSubmit(): void {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const value = this.form.value as CreateAdRequest;

    this.adsService.createAd(value).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Failed to create ad', error);
        this.isSubmitting.set(false);
      },
    });
  }

  handleCancel(): void {
    this.router.navigate(['/']);
  }
}

