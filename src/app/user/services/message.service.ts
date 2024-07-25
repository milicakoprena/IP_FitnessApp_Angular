import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { MessageRequest } from '../../model/message-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:9000/messages';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  public addMessage(messageRequest: MessageRequest): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.post(`${this.apiUrl}`, messageRequest, header);
  }
}
