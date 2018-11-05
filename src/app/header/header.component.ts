import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListnerSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authListnerSubs = this.authService.getauthStatusListner().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authService.LogOut();
  }

  ngOnDestroy() {
    this.authListnerSubs.unsubscribe();
  }

}
