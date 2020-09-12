import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  allSignupData: any;
  errorMessage: string | null;
  incorrectError = false;
  getState: Observable<any>;
  user: User = new User();

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    // Check user registaer code
    this.authService.getSignUpData().subscribe((response) => {
      this.allSignupData = response;
      // checks whether an element is even
      const even = (item: any) =>
        this.user.email === item.email && this.user.password === item.password;
      if (this.allSignupData.some(even) === true) {
        const payload = {
          email: this.user.email,
          password: this.user.password,
        };
        this.store.dispatch(new LogIn(payload));
      } else {
        this.incorrectError = true;
        setTimeout(() => {
          this.incorrectError = false;
        }, 3000);
      }
    });
  }
}
