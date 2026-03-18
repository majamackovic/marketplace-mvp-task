import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  host: { class: 'flex min-h-0 flex-1 flex-col overflow-y-auto' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly isSubmitting = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (!control || !(control.dirty || control.touched) || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return 'This field is required';
    }

    if (controlName === 'email' && control.errors['email']) {
      return 'Please enter a valid email address.';
    }

    return null;
  }

  handleSubmit(): void {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const credentials = this.form.value as LoginRequest;
    console.log('Login attempt:', credentials)
    this.authService.login(credentials).subscribe({
      next: () => {
        this.isSubmitting.set(false);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.isSubmitting.set(false);
      },
    });
  }
}

