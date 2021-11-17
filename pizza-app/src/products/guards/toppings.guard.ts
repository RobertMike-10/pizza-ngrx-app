import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {tap,filter,take,switchMap,catchError} from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class ToppingsGuard implements CanActivate{

  constructor(private store: Store<fromStore.ProductsState>){

  }

  canActivate():Observable<boolean>{
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    )
  }

  checkStore():Observable<boolean>{
    return this.store.select(fromStore.getToppingsLoaded).pipe(
      tap((loaded:boolean) => {
        if(!loaded){
          this.store.dispatch(new fromStore.LoadToppings())
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
