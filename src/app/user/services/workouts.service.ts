import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private workoutsUrl = 'https://api.api-ninjas.com/v1/exercises';
  private apiKey: string = 'oQx6BQVXx4g1qLB/gXk2cQ==5hick1MZEJuFAqvq';

  constructor(private httpClient: HttpClient) {}

  getworkouts(): Observable<any> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey,
    });

    return this.httpClient.get(this.workoutsUrl, { headers });
  }
}
