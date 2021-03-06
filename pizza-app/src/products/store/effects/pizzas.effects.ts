import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError, distinctUntilChanged, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as pizzaActions from '../actions/pizzas.action';
import * as services from '../../services';
import * as fromRoot from '../../../app/store';
import { Pizza } from 'src/products/models/pizza.model';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: services.PizzasService,
    private router: Router,
    private location: Location
  ) {}
  //an action, when load pizzas fire the httpp service
  @Effect()
  loadPizzas$ = this.actions$.pipe(
    ofType(pizzaActions.LOAD_PIZZAS),
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
        catchError((error: any) => of(new pizzaActions.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.pipe(
    ofType(pizzaActions.CREATE_PIZZA),
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService.createPizza(pizza).pipe(
        map((pizza: Pizza) => new pizzaActions.CreatePizzaSuccess(pizza)),
        catchError((error: any) => of(new pizzaActions.CreatePizzaFail(error)))
      );
    })
  );

  @Effect()
  updatePizza$ = this.actions$.pipe(
    ofType(pizzaActions.UPDATE_PIZZA),
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map((pizza: Pizza) => new pizzaActions.UpdatePizzaSuccess(pizza)),
        catchError((error: any) => of(new pizzaActions.UpdatePizzaFail(error)))
      );
    })
  );

  @Effect()
  removePizza$ = this.actions$.pipe(
    ofType(pizzaActions.REMOVE_PIZZA),
    map((action: pizzaActions.RemovePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzaService.removePizza(pizza).pipe(
        map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
        catchError((error: any) => of(new pizzaActions.RemovePizzaFail(error)))
      );
    })
  );

  @Effect()
  createPizzaSuccess$ = this.actions$.pipe(
    ofType(pizzaActions.CREATE_PIZZA_SUCCESS),
    distinctUntilChanged(),
    //map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
    tap((action: pizzaActions.CreatePizzaSuccess) =>{
      const pizza = action.payload;
      const path =  ['/products', pizza.id];
      this.router.navigate(path);
    })
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$.pipe(
    ofType(pizzaActions.REMOVE_PIZZA_SUCCESS,pizzaActions.UPDATE_PIZZA_SUCCESS),
    distinctUntilChanged(),
    tap((pizza: Pizza) => {
      const path =  ['/products'];
      //console.log("Probando");
      this.router.navigate(path);
      ;})

  );
}
