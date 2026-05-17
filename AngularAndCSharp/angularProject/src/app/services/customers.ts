import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers'

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private apiUrl = "https://localhost:7003/api/Customer"

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
}
