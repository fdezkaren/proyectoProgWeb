
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private currentUser: string | null = null;

  login(username: string) {
    this.loggedIn = true;
    this.currentUser = username;
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
