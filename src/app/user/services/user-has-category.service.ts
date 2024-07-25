import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserHasCategoryService {
  private apiUrl = 'http://localhost:9000/user_has_categories';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.loginService.getAccessToken()}`
    );
  }

  public userHasCategory(
    userId: number,
    categoryId: number
  ): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${this.apiUrl}/${userId}/${categoryId}`,
      { headers: this.getHeaders() }
    );
  }

  addUserCategory(userId: number, categoryId: number): Observable<any> {
    return this.httpClient.post(
      this.apiUrl,
      { userId, categoryId },
      { headers: this.getHeaders() }
    );
  }

  removeUserCategory(userId: number, categoryId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${userId}/${categoryId}`, {
      headers: this.getHeaders(),
    });
  }
}
