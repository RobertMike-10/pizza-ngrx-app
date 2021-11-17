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
});
