import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private toastController: ToastController) {}

  async register() {
    if (/^[a-zA-Z0-9]{3,8}$/.test(this.username) && /^\d{4}$/.test(this.password)) {
      const toast = await this.toastController.create({
        message: 'Cuenta creada con éxito.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      this.router.navigate(['/login']);
    } else {
      const toast = await this.toastController.create({
        message: 'Ingrese un usuario válido (min. 3 - max. 8 caracteres) y/o una contraseña de 4 dígitos numéricos.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
  }
}
