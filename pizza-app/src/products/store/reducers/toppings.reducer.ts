import {
  LoadToppingsSuccess,
  LOAD_TOPPINGS,
  LOAD_TOPPINGS_FAIL,
  LOAD_TOPPINGS_SUCCESS,
  ToppingsAction,
} from '../actions/toppings.action';
import { Topping } from 'src/products/models/topping.model';

export interface ToppingState {
  entities: {[id:number]:Topping};
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: ToppingsAction
): ToppingState {
  switch (action.type) {
    case LOAD_TOPPINGS: {
      return loadToppings(state);
    }
    case LOAD_TOPPINGS_SUCCESS: {
      return loadToppingsSuccess(state,action);
    }
    case LOAD_TOPPINGS_FAIL: {
      return loadToppingsFail(state);
    }
  }
  return state;
}

function loadToppings(state: ToppingState): ToppingState {
  return {
    ...state,
    loading: true,
  };
}

//real mapping of the pizzas from back end
function loadToppingsSuccess(state: ToppingState, action:LoadToppingsSuccess): ToppingState {
const toppings = action.payload;
const entities = toppings.reduce((entities:{[id:number]:Topping}, topping:Topping)=> {
  return {
    ...entities,
    [topping.id as number]: topping,
  };
},{...state.entities,})

 return{
  ...state,
  loading: false,
  loaded:true,
  entities
 }
}

function loadToppingsFail(state: ToppingState): ToppingState {
  return{
   ...state,
   loading: false,
   loaded:false
  }
 }

 export const getToppingsLoading =(state:ToppingState) => state.loading;
 export const getToppingsLoaded =(state:ToppingState) => state.loaded;
 export const getToppingsEntities =(state:ToppingState) => state.entities;
