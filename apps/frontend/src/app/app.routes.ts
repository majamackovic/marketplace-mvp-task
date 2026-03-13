import { Route } from '@angular/router';
import { AdsListComponent } from './features/ads/ads-list.component';
import { AdFormComponent } from './features/ad-form/ad-form.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AdsListComponent,
  },
  {
    path: 'create-ad',
    component: AdFormComponent,
  },
];
