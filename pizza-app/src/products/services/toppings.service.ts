import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Topping } from '../models/topping.model';

@Injectable()
export class ToppingsService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:3000';
  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(`${this.baseUrl}/api/toppings`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
