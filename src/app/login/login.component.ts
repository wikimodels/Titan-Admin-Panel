import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HOME } from 'consts/routes.consts';

import { EMPTY } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { AuthService } from '../services/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}
  login() {
    this.auth
      .loginViaGoogle()
      .pipe(
        take(1),
        catchError((error) => {
          // this.sessionsStore.getAllSessions();
          // this.snackbar.openSnackBar(`${error.message} 😢`, 'Close');
          return EMPTY;
        })
      )
      .subscribe((response) => {
        console.log('response from google', response);
        console.log('response.user from google', response.user);
        if (response.user) {
          const user = {
            displayName: response.user.displayName,
            email: response.user.email,
          };

          this.auth.setCurrentUser(
            response.user.displayName,
            response.user.email
          );
          if (user.email != 'cornevur3@gmail.com') {
            this.auth.logout();
            this.router.navigate([HOME]);
          } else {
            this.router.navigateByUrl(this.auth.getRedirectUrl());
          }
        }
      });
  }
}
