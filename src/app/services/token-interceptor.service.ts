import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        request = request.clone();
        if (error.status === 403) {
          this.zone.run(() => {
            this.snackBar
              .open('Your session has expired!', 'Close')
              .afterDismissed()
              .subscribe(() => {
                this.loginService.logout();
                this.router.navigate(['/auth/login']);
              });
          });
        }
        return throwError(error);
      })
    );
  }
}
