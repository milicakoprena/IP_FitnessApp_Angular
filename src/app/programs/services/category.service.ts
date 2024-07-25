import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:9000/categories';

  constructor(private httpClient: HttpClient) {}

  public getCategories() {
    return this.httpClient.get<any>(this.apiUrl);
  }

  public getAttributesByCategoryId(categoryId: number) {
    return this.httpClient.get<any[]>(
      `${this.apiUrl}/${categoryId}/attributes`
    );
  }
}
