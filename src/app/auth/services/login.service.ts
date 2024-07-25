import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../model/login-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../../model/login-response';
import { User } from '../../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:9000';
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService
  ) {}

  public login(loginRequest: LoginRequest): Observable<any> {
    this.isAuthenticatedSubject.next(true);
    return this.httpClient.post<LoginResponse>(
      `${this.apiUrl}/login`,
      loginRequest
    );
  }

  saveAccessToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  }

  getAccessToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
      return token;
    } else return null;
  }

  logout() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  saveUser(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    if (typeof localStorage !== 'undefined') {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } else return null;
  }

  public isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !this.jwtHelper.isTokenExpired(token);
  }
}
