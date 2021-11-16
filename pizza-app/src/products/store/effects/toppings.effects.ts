import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as services from '../../services';
import * as toppingActions from '../actions/toppings.action';

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingService: services.ToppingsService
  ) {}
  //an action, when load toppings fire the httpp service
  @Effect()
  loadToppings$ = this.actions$.pipe(
    ofType(toppingActions.LOAD_TOPPINGS),
    switchMap(() => {
      return this.toppingService.getToppings().pipe(
        map((toppings) => new toppingActions.LoadToppingsSuccess(toppings)),
        catchError((error: any) => of(new toppingActions.LoadToppingsFail(error)))
      );
    })
  );
}
