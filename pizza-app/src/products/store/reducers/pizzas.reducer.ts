import { state } from '@angular/animations';
import { Pizza } from 'src/products/models/pizza.model';
import {
  LoadPizzasSuccess,
  LOAD_PIZZAS,
  LOAD_PIZZAS_FAIL,
  LOAD_PIZZAS_SUCCESS,
  PizzasAction,
} from '../actions/pizzas.action';
export interface PizzaState {
  entities: {[id:number]:Pizza};
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
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
      return loadPizzasSuccess(state,action);
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

//real mapping of the pizzas from back end
function loadPizzasSuccess(state: PizzaState, action:LoadPizzasSuccess): PizzaState {
const pizzas = action.payload;
const entities = pizzas.reduce((entities:{[id:number]:Pizza}, pizza:Pizza)=> {
  return {
    ...entities,
    [pizza.id as number]: pizza,
  };
},{...state.entities,})

 return{
  ...state,
  loading: false,
  loaded:true,
  entities
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
 export const getPizzasEntities =(state:PizzaState) => state.entities;

