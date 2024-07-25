import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrl: './custom-toolbar.component.css',
})
export class CustomToolbarComponent implements OnInit {
  toolbarButtons: any[] = [];
  anonToolbarButtons = [
    { name: 'Home', route: '/' },
    { name: 'Sign In', route: '/auth/login' },
    { name: 'Sign Up', route: '/auth/register' },
    { name: 'Fitness programs', route: '/programs' },
  ];

  userToolbarButton = [
    { name: 'Home', route: '/' },
    { name: 'Fitness programs', route: '/programs' },
    { name: 'My account', route: '/user/account' },
  ];
  isAuthenticated: boolean = false;

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      this.updateToolbar();
    });
  }

  private updateToolbar(): void {
    this.toolbarButtons = this.isAuthenticated
      ? this.userToolbarButton
      : this.anonToolbarButtons;
    this.cdr.detectChanges();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }
}
