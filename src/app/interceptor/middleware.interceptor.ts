import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable()
export class MiddlewareInterceptor implements HttpInterceptor {

  constructor(private apiService:ApiService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 0) {
              this.apiService.errorToast("Connection Refused...");
            } else {
            }
          }
        }
      )
    );
  }
}
