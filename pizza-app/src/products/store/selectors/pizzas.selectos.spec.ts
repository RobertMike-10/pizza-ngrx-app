import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';
import { Pizza } from '../../models/pizza.model';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/index';
import * as fromSelectors from '../selectors/pizzas.selectors';


describe('Pizzas Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const pizza1: Pizza = {
    id: 1,
    name: "Fish 'n Chips",
    toppings: [
      { id: 1, name: 'fish' },
      { id: 2, name: 'chips' },
      { id: 3, name: 'cheese' },
    ],
  };

  const pizza2: Pizza = {
    id: 2,
    name: 'Aloha',
    toppings: [
      { id: 1, name: 'ham' },
      { id: 2, name: 'pineapple' },
      { id: 3, name: 'cheese' },
    ],
  };

  const pizza3: Pizza = {
    id: 3,
    name: 'Burrito',
    toppings: [
      { id: 1, name: 'beans' },
      { id: 2, name: 'beef' },
      { id: 3, name: 'rice' },
      { id: 4, name: 'cheese' },
      { id: 5, name: 'avocado' },
    ],
  };

  const pizzas: Pizza[] = [pizza1, pizza2, pizza3];

  const entities = {
    1: pizzas[0],
    2: pizzas[1],
    3: pizzas[2],
  };



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers),
        }),
      ],
    });

    store = TestBed.get(Store);
  });

  describe('getPizzaState', () => {
    it('should return state of pizza store slice', () => {
      let result;

      store
        .select(fromSelectors.getPizzaState)
        .subscribe((value) => (result = value));

      expect(result as any).toEqual({
        entities: {},
        loaded: false,
        loading: false,
      });

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      expect(result as any).toEqual({
        entities,
        loaded: true,
        loading: false,
      });
    });
  });

  describe('getPizzaEntities', () => {
    it('should return pizzas as entities', () => {
      let result;

      store
        .select(fromSelectors.getPizzasEntitites)
        .subscribe((value) => (result = value));

      expect(result as any).toEqual({});

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      expect(result as any).toEqual(entities);
    });
  });


  describe('getAllPizzas', () => {
    it('should return pizzas as an array', () => {
      let result;

      store
        .select(fromSelectors.getAllPizzas)
        .subscribe((value) => (result = value));

      expect(result as any ).toEqual([]);

      store.dispatch(new fromActions.LoadPizzasSuccess(pizzas));

      expect(result as any).toEqual(pizzas);
    });
  });

  describe('getPizzasLoaded', () => {
    it('should return the pizzas loaded state', () => {
      let result;

      store
        .select(fromSelectors.getPizzasLoaded)
        .subscribe((value) => (result = value));

      expect(result as any).toEqual(false);

      store.dispatch(new fromActions.LoadPizzasSuccess([]));

      expect(result as any).toEqual(true);
    });
  });

  describe('getPizzasLoading', () => {
    it('should return the pizzas loading state', () => {
      let result;

      store
        .select(fromSelectors.getPizzasLoading)
        .subscribe((value) => (result = value));

      expect(result as any).toEqual(false);

      store.dispatch(new fromActions.LoadPizzas());

      expect(result as any).toEqual(true);
    });
  });
});
