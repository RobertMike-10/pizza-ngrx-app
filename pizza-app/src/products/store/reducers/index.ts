import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings:fromToppings.ToppingState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer as ActionReducer<fromPizzas.PizzaState, Action>,
  toppings: fromToppings.reducer as ActionReducer<fromToppings.ToppingState, Action>
};

export const getProductsState =
  createFeatureSelector<ProductsState>('products');


