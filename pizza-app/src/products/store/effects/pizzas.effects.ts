import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as pizzaActions from '../actions/pizzas.action';
import * as services from '../../services';
import { of } from 'rxjs';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: services.PizzasService
  ) {}
 //an action, when load pizzas fire the httpp service
  @Effect()
  loadPizzas$ = this.actions$.pipe(
    ofType(pizzaActions.LOAD_PIZZAS),
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map(pizzas  => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError((error:any) => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );
}
