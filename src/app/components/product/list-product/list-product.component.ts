import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AppState, selectMusicState } from '../../../store/app.states';
import { Store } from '@ngrx/store';
import { ListProducts } from '../../../store/actions/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  errorMessage: string | null;
  getState: Observable<any>;
  isUpdateActivated = false;
  products: any;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectMusicState);
  }
  showUpdateForm(): void {
    this.isUpdateActivated = true;
  }

  ngOnInit(): void {
    this.store.dispatch(new ListProducts());
    this.store.subscribe((data) => {
      this.products = data.product.products;
    });
  }

  deleteMusic(id: number): void {
    this.authService.deleteProduct(id).subscribe((res) => {
      this.products = this.products.filter((item) => item.id !== id);
    });
  }
}
