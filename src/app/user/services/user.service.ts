import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { Observable } from 'rxjs';
import { UserRequest } from '../../model/user-request';
import { PasswordRequest } from '../../model/password-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:9000/users';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  public updateUser(userRequest: UserRequest, userId: number): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.put(`${this.apiUrl}/${userId}`, userRequest, header);
  }

  public changePassword(
    passwordRequest: PasswordRequest,
    userId: number
  ): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.put(
      `${this.apiUrl}/${userId}/password`,
      passwordRequest,
      header
    );
  }

  public getProgramsByCreatorId(userId: number) {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.get<any>(
      `${this.apiUrl}/${userId}/my_programs`,
      header
    );
  }

  public getProgramsByUserId(userId: number) {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.get<any>(
      `${this.apiUrl}/${userId}/programs`,
      header
    );
  }

  public userHasProgram(userId: number, programId: number) {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.get<boolean>(
      `${this.apiUrl}/${userId}/userhasprogram/${programId}`,
      header
    );
  }

  public userCompletedProgram(userId: number, programId: number) {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.get<boolean>(
      `${this.apiUrl}/${userId}/usercompletedprogram/${programId}`,
      header
    );
  }

  public getTrackersByUserId(userId: number) {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.get<any>(
      `${this.apiUrl}/${userId}/fitnesstrackers`,
      header
    );
  }

  public getUsers() {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.get<any>(this.apiUrl, header);
  }
}
