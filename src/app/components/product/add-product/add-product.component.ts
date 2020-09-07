import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AppState } from '../../../store/app.states';
import { Store } from '@ngrx/store';
import { AddProducts, ListProducts } from 'src/app/store/actions/product.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product: any = {
    productName: null,
    productNumber: null
  }
  addForm: FormGroup;
  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit() {
    const payload = {
      productName: this.product.productName,
      productNumber: this.product.productNumber
    };
    this.store.dispatch(new AddProducts(payload));
    this.store.dispatch(new ListProducts());
    this.router.navigate(['/list-product']);
  }

}
