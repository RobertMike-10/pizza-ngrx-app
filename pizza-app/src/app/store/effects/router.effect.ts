import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import * as RouterActions from '../actions/router.action';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect()
  navigate$ = this.actions$.pipe(
    ofType(RouterActions.GO),
    tap((action:RouterActions.Go) => console.log("Ypexisto")),
    map((action:RouterActions.Go) => action.payload),
    tap(({path,query:queryParams,extras }) => {
      console.log(path);
      this.router.navigate(path,{queryParams,...extras});
    })
  );

  @Effect({dispatch:false})
  navigateBack$ = this.actions$.pipe(
    ofType(RouterActions.BACK),
    tap(()=>{
      this.location.back();
    })
  );

  @Effect({dispatch:false})
  navigateForward$ = this.actions$.pipe(
    ofType(RouterActions.FORWARD),
    tap(()=>{
      this.location.forward();
    })
  );
}
