import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  private apiUrl = 'http://localhost:9000/attributes';

  constructor(private httpClient: HttpClient) {}

  public getAttributeValuesByAttributeId(attributeId: number) {
    return this.httpClient.get<any[]>(
      `${this.apiUrl}/${attributeId}/attributevalues`
    );
  }
}
