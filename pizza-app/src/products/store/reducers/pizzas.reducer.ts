import { state } from '@angular/animations';
import { Pizza } from 'src/products/models/pizza.model';
import {
  LOAD_PIZZAS,
  LOAD_PIZZAS_FAIL,
  LOAD_PIZZAS_SUCCESS,
  PizzasAction,
} from '../actions/pizzas.action';
export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  data: [],
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: PizzasAction
): PizzaState {
  switch (action.type) {
    case LOAD_PIZZAS: {
      return loadPizzas(state);
    }
    case LOAD_PIZZAS_SUCCESS: {
      return loadPizzasSuccess(state);
    }
    case LOAD_PIZZAS_FAIL: {
      return loadPizzasFail(state);
    }
  }
  return state;
}

function loadPizzas(state: PizzaState): PizzaState {
  return {
    ...state,
    loading: true,
  };
}

function loadPizzasSuccess(state: PizzaState): PizzaState {
 return{
  ...state,
  loading: false,
  loaded:true
 }
}

function loadPizzasFail(state: PizzaState): PizzaState {
  return{
   ...state,
   loading: false,
   loaded:false
  }
 }

 export const getPizzasLoading =(state:PizzaState) => state.loading;
 export const getPizzasLoaded =(state:PizzaState) => state.loaded;
 export const getPizzas =(state:PizzaState) => state.data;

