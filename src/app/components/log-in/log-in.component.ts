import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { Router } from "@angular/router";
import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  allSignupData: any;
  incorrectError = false;

  constructor(private store: Store<AppState>, private router: Router, private authService: AuthService) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  };

  onSubmit(): void {
    // Check user registaer code
    this.authService.getSignUpData().subscribe((response) => {
      this.allSignupData = response;
      // checks whether an element is even
      const even = (item: any) => this.user.email === item.email && this.user.password === item.password;
      if (this.allSignupData.some(even) === true) {
        const payload = {
          email: this.user.email,
          password: this.user.password
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
