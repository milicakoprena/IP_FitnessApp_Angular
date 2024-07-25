import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { Observable } from 'rxjs';
import { FitnessTrackerRequest } from '../../model/fitness-tracker-request';

@Injectable({
  providedIn: 'root',
})
export class FitnessTrackerService {
  private apiUrl = 'http://localhost:9000/fitnesstrackers';

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  public addTracker(
    fitnessTrackerRequest: FitnessTrackerRequest
  ): Observable<any> {
    var header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.loginService.getAccessToken()}`
      ),
    };
    return this.httpClient.post(
      `${this.apiUrl}`,
      fitnessTrackerRequest,
      header
    );
  }
}
