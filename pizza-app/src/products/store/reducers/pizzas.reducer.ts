import { state } from '@angular/animations';
import { Statement } from '@angular/compiler';
import { Pizza } from 'src/products/models/pizza.model';
import * as actions from '../actions/pizzas.action';
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
  action: actions.PizzasAction
): PizzaState {
  switch (action.type) {
    case actions.LOAD_PIZZAS: {
      return loadPizzas(state);
    }
    case actions.LOAD_PIZZAS_SUCCESS: {
      return loadPizzasSuccess(state,action);
    }
    case actions.LOAD_PIZZAS_FAIL: {
      return loadPizzasFail(state);
    }
    case actions.UPDATE_PIZZA_SUCCESS:
    case actions.CREATE_PIZZA_SUCCESS: {
      return createPizzaSuccess(state,action);
    }
    case actions.REMOVE_PIZZA_SUCCESS: {
      return removePizzaSuccess(state,action);
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
function loadPizzasSuccess(state: PizzaState, action:actions.LoadPizzasSuccess): PizzaState {
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

 function createPizzaSuccess(state: PizzaState,action:actions.CreatePizzaSuccess|actions.UpdatePizzaSuccess){
   const pizza = action.payload;
   const entities = {
     ...state.entities,
     [pizza.id as number]:pizza
   }
   return {
     ...state,
     entities
   }
 }

 function removePizzaSuccess(state: PizzaState,action:actions.RemovePizzaSuccess){
  const pizza = action.payload;
  const {[pizza.id as number]: removed, ...entities} =state.entities
  return {
    ...state,
    entities
  }
 }


 export const getPizzasLoading =(state:PizzaState) => state.loading;
 export const getPizzasLoaded =(state:PizzaState) => state.loaded;
 export const getPizzasEntities =(state:PizzaState) => state.entities;

