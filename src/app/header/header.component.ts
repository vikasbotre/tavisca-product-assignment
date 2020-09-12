import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.states';
import { Observable } from 'rxjs';
import { LogOut } from '../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  editMode = false;
  errorMessage = null;
  getState: Observable<any>;
  isAuthenticated = false;
  showColor = false;
  user = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.editMode = true;
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  toggle(): void {
    this.showColor = !this.showColor;
    if (this.showColor) {
      this.renderer.setStyle(
        this.el.nativeElement.ownerDocument.body,
        'backgroundColor',
        'rgb(216 207 99 / 45%)'
      );
    } else {
      this.renderer.setStyle(
        this.el.nativeElement.ownerDocument.body,
        'backgroundColor',
        'rgb(195 202 218 / 59%)'
      );
    }
  }

  public logOut(): void {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/log-in']);
  }
}
