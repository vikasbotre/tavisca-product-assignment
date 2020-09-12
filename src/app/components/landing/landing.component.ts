import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { IProduct } from '../../models/product';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  errorMessage = null;
  getState: Observable<any>;
  isAuthenticated: false;
  products: IProduct[];
  user = null;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });

    this.authService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  logOut(): void {
    // tslint:disable-next-line:new-parens
    this.store.dispatch(new LogOut());
  }
}
