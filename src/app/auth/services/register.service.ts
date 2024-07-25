import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageRequest } from '../../model/image-request';
import { RegisterRequest } from '../../model/register-request';
import { AccountActivationRequest } from '../../model/account-activation-request';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:9000';

  constructor(private httpClient: HttpClient) {}

  public register(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/sign_up`, registerRequest);
  }

  public activate(
    accountActivationRequest: AccountActivationRequest
  ): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/activate`,
      accountActivationRequest
    );
  }
}
