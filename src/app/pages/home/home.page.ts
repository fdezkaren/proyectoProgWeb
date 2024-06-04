import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { AlertController, NavController, ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  saveData(data: any) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  getData() {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('nombreInput', { static: false }) nombreInput: any;
  @ViewChild('apellidoInput', { static: false }) apellidoInput: any;

  username: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: string = '';

  constructor(
    private route: ActivatedRoute, 
    private toastController: ToastController, 
    private alertController: AlertController,
    private dataService: DataService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || '';
    });
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaNacimiento = '';

    if (this.nombreInput) {
      this.nombreInput.el.classList.add('shake');
      setTimeout(() => this.nombreInput.el.classList.remove('shake'), 1000);
    }

    if (this.apellidoInput) {
      this.apellidoInput.el.classList.add('shake');
      setTimeout(() => this.apellidoInput.el.classList.remove('shake'), 1000);
    }
  }

  async mostrar() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es ${this.nombre} ${this.apellido}`,
      buttons: ['OK']
    });

    await alert.present();
  }
  guardar() {
    const userData = {
      nombre: this.nombre,
      apellido: this.apellido,
      nivelEducacion: this.nivelEducacion,
      fechaNacimiento: this.fechaNacimiento
    };
    
    this.dataService.saveData(userData);

    const navigationExtras: NavigationExtras = {
      state: {
        userData: userData
      }
    };
    this.navCtrl.navigateForward('/profile', navigationExtras);
  }

  
}
