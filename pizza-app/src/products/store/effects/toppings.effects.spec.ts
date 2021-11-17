import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { Actions } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { empty } from 'rxjs';
import { of } from 'rxjs';

import { ToppingsService } from '../../services/toppings.service';
import * as fromEffects from './toppings.effects';
import * as fromActions from '../actions/toppings.action';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
});

describe('ToppingsEffects', () => {
  let actions$: TestActions;
  let service: ToppingsService;
  let effects: fromEffects.ToppingsEffects;

  const toppings = [
    { id: 1, name: 'onion' },
    { id: 2, name: 'mushroom' },
    { id: 3, name: 'basil' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToppingsService,
        fromEffects.ToppingsEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(ToppingsService);
    effects = TestBed.get(fromEffects.ToppingsEffects);

    spyOn(service, 'getToppings').and.returnValue(of(toppings));
  });

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      testScheduler.run((helpers) => {
        const { cold, hot } = helpers;
      const action = new fromActions.LoadToppings();
      const completion = new fromActions.LoadToppingsSuccess(toppings);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadToppings$ as any).toBe(expected);
    });
  });
  });

});
