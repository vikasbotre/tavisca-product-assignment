import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../services/auth.service';
import { IProduct } from '../../../models/product';
import { Observable } from 'rxjs';
import { AppState, selectMusicState } from '../../../store/app.states';
import {
  ListProducts,
  UpdateProducts,
} from '../../../store/actions/product.actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  errorMessage: string | null;
  editform: FormGroup;
  id: number;
  getState: Observable<any>;
  product: IProduct;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fbs: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.getState = this.store.select(selectMusicState);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.productId;
    this.authService.getProductById(this.id).subscribe((data: IProduct) => {
      this.product = data;
    });

    this.editform = this.fbs.group({
      productName: [''],
      productNumber: [''],
      productCategory: [''],
      productPrice: [''],
    });

    this.authService.getProductById(this.id).subscribe((data) => {
      this.editform.setValue(data);
    });
  }

  submit(): void {
    const payload = {
      index: this.id,
      newProduct: this.editform.value,
    };
    this.store.dispatch(new UpdateProducts(payload));
    this.store.dispatch(new ListProducts());
    this.router.navigateByUrl('/list-product');
  }
}
