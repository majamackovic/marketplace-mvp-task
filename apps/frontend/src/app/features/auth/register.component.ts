import {
  ChangeDetectionStrategy,
  Component,
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
import { RegisterRequest } from '../../clients/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  host: { class: 'flex min-h-0 flex-1 flex-col' },
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly isSubmitting = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: [''],
  });

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get phone() {
    return this.form.get('phone');
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

    if (controlName === 'password' && control.errors['minlength']) {
      return 'Password must be at least 6 characters.';
    }

    return null;
  }

  handleSubmit(): void {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const data: RegisterRequest = {
      email: this.form.value.email,
      password: this.form.value.password,
      name: this.form.value.name || undefined,
      phone: this.form.value.phone || undefined,
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.isSubmitting.set(false);
      },
      error: () => {
        this.isSubmitting.set(false);
      },
    });
  }
}
