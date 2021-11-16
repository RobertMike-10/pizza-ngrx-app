import { createSelector } from "@ngrx/store";
import { Topping } from "src/products/models/topping.model";
import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers'
import * as fromToppings from '../reducers/toppings.reducer'
//toppings state
export const getToppingState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(
  getToppingState,
  fromToppings.getToppingsEntities
);
export const getAllToppings= createSelector(
  getToppingsEntities,
  (entities) =>{
    //object keys return al keys, then map using the id to obtain each item of the array,
    //removing the key and object structure
    return Object.keys(entities).map((id:string) => entities[parseInt(id,10)]);
  }
);
export const getToppingsLoaded = createSelector(
  getToppingState,
  fromToppings.getToppingsLoaded
);
export const getToppingsLoading = createSelector(
  getToppingState,
  fromToppings.getToppingsLoading
);

export const getSelectedToppings = createSelector(
  getToppingState,
  fromToppings.getSelectedToppings
);
