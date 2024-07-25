import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramHasAttributeRequest } from '../../model/program-has-attribute-request';
import { Observable } from 'rxjs';
import { LoginService } from '../../auth/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramHasAttributeService {
  private apiUrl = 'http://localhost:9000/program_has_attributes';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  public addNewValue(
    programHasAttributeRequest: ProgramHasAttributeRequest
  ): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.post(
      `${this.apiUrl}`,
      programHasAttributeRequest,
      header
    );
  }
}
