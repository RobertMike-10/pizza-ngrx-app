import { IterableDiffers } from '@angular/core';
import * as fromPizzas from './pizzas.action';

describe('Pizzas Actions', ()=> {

  describe ('LoadPizzas Actions', ()=>{
    describe('LoadPizzas', () => {
      it('should create an action', () =>{
        const action = new fromPizzas.LoadPizzas();
        expect({...action}).toEqual({
          type:fromPizzas.LOAD_PIZZAS
        });
      });
    });

    describe('LoadPizzasFail', () => {
      it('should create an action', () =>{
        const payload= {message:'LoadError'}
        const action = new fromPizzas.LoadPizzasFail(payload);
        expect({...action}).toEqual({
          type:fromPizzas.LOAD_PIZZAS_FAIL,
          payload
        });
      });
    });

    describe('LoadPizzasSuccess', () => {
      it('should create an action', () =>{
        const payload= [{name:'HotDeliciuos',
                       toppings:[{id:1, name:'pepperonni'},
                       {id:2, name:'salami'}
                      ],
                      id:1}]
        const action = new fromPizzas.LoadPizzasSuccess(payload);
        expect({...action}).toEqual({
          type:fromPizzas.LOAD_PIZZAS_SUCCESS,
          payload
        });
      });
    });

  });

  describe('CreatePizza Actions', () => {
    describe('CreatePizza', () => {
      it('should create an action', () => {
        const payload = {
          name: 'Pizza Mia',
          toppings: [
            { id: 1, name: 'onion' },
            { id: 2, name: 'mushroom' },
            { id: 3, name: 'basil' },
          ],
        };
        const action = new fromPizzas.CreatePizza(payload);

        expect({ ...action }).toEqual({
          type: fromPizzas.CREATE_PIZZA,
          payload,
        });
      });
    });

    describe('CreatePizzaFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Create Error' };
        const action = new fromPizzas.CreatePizzaFail(payload);

        expect({ ...action }).toEqual({
          type: fromPizzas.CREATE_PIZZA_FAIL,
          payload,
        });
      });
    });

    describe('CreatePizzaSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Pizza Mia',
          toppings: [
            { id: 1, name: 'onion' },
            { id: 2, name: 'mushroom' },
            { id: 3, name: 'basil' },
          ],
        };
        const action = new fromPizzas.CreatePizzaSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromPizzas.CREATE_PIZZA_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('UpdatePizza Actions', () => {
    describe('UpdatePizza', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Pizza Mia',
          toppings: [
            { id: 1, name: 'onion' },
            { id: 2, name: 'mushroom' },
            { id: 3, name: 'basil' },
          ],
        };
        const action = new fromPizzas.UpdatePizza(payload);

        expect({ ...action }).toEqual({
          type: fromPizzas.UPDATE_PIZZA,
          payload,
        });
      });
    });

    describe('UpdatePizzaFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Update Error' };
        const action = new fromPizzas.UpdatePizzaFail(payload);

        expect({ ...action }).toEqual({
          type: fromPizzas.UPDATE_PIZZA_FAIL,
          payload,
        });
      });
    });

    describe('UpdatePizzaSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Pizza Mia',
          toppings: [
            { id: 1, name: 'onion' },
            { id: 2, name: 'mushroom' },
            { id: 3, name: 'basil' },
          ],
        };
        const action = new fromPizzas.UpdatePizzaSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromPizzas.UPDATE_PIZZA_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('RemovePizza Actions', () => {
    describe('RemovePizza', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Pizza Mia',
          toppings: [
            { id: 1, name: 'onion' },
            { id: 2, name: 'mushroom' },
            { id: 3, name: 'basil' },
          ],
        };
        const action = new fromPizzas.RemovePizza(payload);

        expect({ ...action }).toEqual({
          type: fromPizzas.REMOVE_PIZZA,
          payload,
        });
      });
    });

    describe('RemovePizzaFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Remove Error' };
        const action = new fromPizzas.RemovePizzaFail(payload);

        expect({ ...action }).toEqual({
          type: fromPizzas.REMOVE_PIZZA_FAIL,
          payload,
        });
      });
    });

    describe('RemovePizzaSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'Pizza Mia',
          toppings: [
            { id: 1, name: 'onion' },
            { id: 2, name: 'mushroom' },
            { id: 3, name: 'basil' },
          ],
        };
        const action = new fromPizzas.RemovePizzaSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromPizzas.REMOVE_PIZZA_SUCCESS,
          payload,
        });
      });
    });
  });

});
