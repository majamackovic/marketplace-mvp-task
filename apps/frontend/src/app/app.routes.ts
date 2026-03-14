import { Route } from '@angular/router';
import { AdsListComponent } from './features/ads/ads-list.component';
import { AdDetailsComponent } from './features/ads/ad-details.component';
import { AdFormComponent } from './features/ad-form/ad-form.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AdsListComponent,
  },
  {
    path: 'ads/:id',
    component: AdDetailsComponent,
  },
  {
    path: 'create-ad',
    component: AdFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
