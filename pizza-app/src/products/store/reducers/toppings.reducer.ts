import * as actions from '../actions/toppings.action';
import { Topping } from 'src/products/models/topping.model';
import { Actions } from '@ngrx/effects';

export interface ToppingState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
};

export function reducer(
  state = initialState,
  action: actions.ToppingsAction
): ToppingState {
  switch (action.type) {
    case actions.LOAD_TOPPINGS: {
      return loadToppings(state);
    }
    case actions.LOAD_TOPPINGS_SUCCESS: {
      return loadToppingsSuccess(state, action);
    }
    case actions.LOAD_TOPPINGS_FAIL: {
      return loadToppingsFail(state);
    }
    case actions.VISUALISE_TOPPINGS: {
      return selectToppings(state, action);
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

function selectToppings(
  state: ToppingState,
  action: actions.VisualiseToppings
) {
  const selectedToppings = action.payload;

  return {
    ...state,
    selectedToppings,
  };
}
//real mapping of the pizzas from back end
function loadToppingsSuccess(
  state: ToppingState,
  action: actions.LoadToppingsSuccess
): ToppingState {
  const toppings = action.payload;
  const entities = toppings.reduce(
    (entities: { [id: number]: Topping }, topping: Topping) => {
      return {
        ...entities,
        [topping.id as number]: topping,
      };
    },
    { ...state.entities }
  );

  return {
    ...state,
    loading: false,
    loaded: true,
    entities,
  };
}

function loadToppingsFail(state: ToppingState): ToppingState {
  return {
    ...state,
    loading: false,
    loaded: false,
  };
}

export const getToppingsLoading = (state: ToppingState) => state.loading;
export const getToppingsLoaded = (state: ToppingState) => state.loaded;
export const getToppingsEntities = (state: ToppingState) => state.entities;
export const getSelectedToppings = (state: ToppingState) =>
  state.selectedToppings;
