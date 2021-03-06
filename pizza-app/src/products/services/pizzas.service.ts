import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000';
  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(`${this.baseUrl}/api/pizzas`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`${this.baseUrl}/api/pizzas`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`${this.baseUrl}/api/pizzas/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`${this.baseUrl}/api/pizzas/${payload.id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
