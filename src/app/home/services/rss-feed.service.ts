import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssFeedService {
  private rssUrl = 'https://feeds.feedburner.com/AceFitFacts';

  constructor(private httpClient: HttpClient) {}

  getRssFeed(): Observable<any> {
    const options = { responseType: 'text' as 'text' };

    return this.httpClient.get(this.rssUrl, options);
  }
}
