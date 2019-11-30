import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor( private token: TokenStorageService, private router: Router ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    if (this.token.getToken() != null) {
      authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this .token.getToken())});
    }
    return next.handle(authReq);
  }
}
