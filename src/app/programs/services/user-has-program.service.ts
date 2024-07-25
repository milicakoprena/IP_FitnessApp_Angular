import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { UserHasProgramRequest } from '../../model/user-has-program-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserHasProgramService {
  private apiUrl = 'http://localhost:9000/user_has_programs';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  public addUserHasProgram(
    userHasProgramRequest: UserHasProgramRequest
  ): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.post(
      `${this.apiUrl}`,
      userHasProgramRequest,
      header
    );
  }
}
