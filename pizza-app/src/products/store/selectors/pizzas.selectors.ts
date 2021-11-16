import { createSelector } from '@ngrx/store';
import { Pizza } from 'src/products/models/pizza.model';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from './toppings.selector';
//pizzas state
export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getPizzasEntitites = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);
export const getAllPizzas = createSelector(getPizzasEntitites, (entities) => {
  //object keys return al keys, then map using the id to obtain each item of the array,
  //removing the key and object structure
  return Object.keys(entities).map((id: string) => entities[parseInt(id, 10)]);
});
export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);

export const getSelectedPizza = createSelector(
  getPizzasEntitites,
  fromRoot.getRouterState,
  (entitites, router: any): Pizza => {
    return router.state && entitites[router.state.params.pizzaId];
  }
);

export const getPizzaVisualised = createSelector(
  getSelectedPizza,
  fromToppings.getToppingsEntities,
  fromToppings.getSelectedToppings,
  (
    pizza: Pizza,
    toppingEntities: { [id: number]: Pizza },
    selectedToppings: number[]
  ) => {
    const toppings = selectedToppings.map((id) => toppingEntities[id]);
    return { ...pizza, toppings };
  }
);
