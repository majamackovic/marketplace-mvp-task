import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HelloResponse {
  message: string;
}

export function getHello(http: HttpClient): Observable<HelloResponse> {
  return http.get<HelloResponse>('/api/hello');
}

