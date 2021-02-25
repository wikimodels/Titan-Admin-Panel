import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HOME } from 'consts/routes.consts';
import { AuthService } from '../services/shared/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private readonly auth: AuthService) {}

  ngOnInit(): void {}
  goHome() {
    this.router.navigate([HOME]);
  }
  logout() {
    this.auth.logout();
    this.router.navigate([HOME]);
  }
}
