import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../auth/services/login.service';
import { ProgramRequest } from '../../model/program-request';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  private apiUrl = 'http://localhost:9000/programs';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  public getPrograms() {
    return this.httpClient.get<any>(this.apiUrl);
  }

  public addNewProgram(programRequest: ProgramRequest): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.post(`${this.apiUrl}`, programRequest, header);
  }

  public getAttributesByProgramId(id: number) {
    return this.httpClient.get<any[]>(`${this.apiUrl}/${id}/attributes`);
  }

  public getCommentsByProgramId(id: number) {
    return this.httpClient.get<any[]>(`${this.apiUrl}/${id}/comments`);
  }

  public delete(id: number) {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`, header);
  }
}
