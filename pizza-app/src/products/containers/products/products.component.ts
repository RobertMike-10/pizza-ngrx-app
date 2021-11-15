import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store'
import { Observable } from 'rxjs';
@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {

  pizzas$!: Observable<Pizza[]>;
  constructor(private pizzaService: PizzasService, private store:Store<fromStore.ProductsState>) {}

  ngOnInit() {
  this.pizzas$ =  this.store.select<any>(fromStore.getAllPizzas);
  //fire the action of load pizzas, at this point effects dispatch the http service
  this.store.dispatch(new fromStore.LoadPizzas());
  }
}
