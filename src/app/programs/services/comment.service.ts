import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { CommentRequest } from '../../model/comment-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:9000/comments';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  public addComments(commentRequest: CommentRequest): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.post(`${this.apiUrl}`, commentRequest, header);
  }
}
