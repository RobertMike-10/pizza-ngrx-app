import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer as ActionReducer<fromPizzas.PizzaState, Action>,
};

export const getProductsState =
  createFeatureSelector<ProductsState>('products');

//pizzas state
export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

export const getPizzasEntitites = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);
export const getAllPizzas = createSelector(
  getPizzasEntitites,
  (entities) =>{
    //object keys return al keys, then map using the id to obtain each item of the array,
    //removing the key and object structure
    return Object.keys(entities).map((id:string) => entities[parseInt(id,10)]);
  }
);
export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
