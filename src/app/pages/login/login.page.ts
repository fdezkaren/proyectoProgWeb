// login.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../../app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
  ) {}

  async login() {
    if (/^[a-zA-Z0-9]{3,8}$/.test(this.username) && /^\d{4}$/.test(this.password)) {
      this.authService.login(this.username);
      this.router.navigate(['/home']);
    } else {
      const toast = await this.toastController.create({
        message: 'Ingrese un usuario válido (min. 3 - max. 8 caracteres) y/o una contraseña de 4 dígitos numéricos.',
        duration: 2000,
        position: 'top',
      });
      toast.present();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUser(): string | null {
    return this.authService.getCurrentUser();
  }
}
