import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pizza } from '../../models/pizza.model';
import * as fromStore from '../../store';
import { Topping } from '../../models/topping.model';
import { ToppingsService } from '../../services/toppings.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise$ | async"> </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$!: Observable<Pizza | null | undefined>;
  visualise$!: Observable<Pizza>;
  toppings$!: Observable<Topping[]>;

  constructor(
    private store: Store<fromStore.ProductsState>,
    private toppingsService: ToppingsService
  ) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza | null = null) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists
          ? pizza!.toppings?.map((topping: Topping) => topping.id)
          : [];
        this.store.dispatch(
          new fromStore.VisualiseToppings(toppings as number[])
        );
      })
    );
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getPizzaVisualised);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
   this.store.dispatch (new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch (new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch (new fromStore.RemovePizza(event));
    }
  }
}
