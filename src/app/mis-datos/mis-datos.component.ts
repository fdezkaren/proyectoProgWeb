import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { AlertController, NavController, ToastController } from "@ionic/angular";
import { IonSegment } from '@ionic/angular';
import { AlumnosService } from '../services/alumnos.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent implements OnInit {

  @ViewChild('nombreInput', { static: false }) nombreInput: any;
  @ViewChild('apellidoInput', { static: false }) apellidoInput: any;
  @ViewChild(IonSegment, { static: true }) segment!: IonSegment;

  photo: string | undefined;
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: string = '';
  alumnos: any[] = [];
  selectedAlumnoId: number | null = null;

  constructor(
    private route: ActivatedRoute, 
    private toastController: ToastController, 
    private alertController: AlertController,
    private navCtrl: NavController,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || '';
    });
    this.obtenerAlumnos();
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaNacimiento = '';
    this.selectedAlumnoId = null;

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
    const alumnoData = {
      nombre: this.nombre,
      apellido: this.apellido,
      nivel_educacional: this.nivelEducacion,
      fecha_nacimiento: this.fechaNacimiento
    };

    if (this.selectedAlumnoId) {
      this.actualizarAlumno(this.selectedAlumnoId, alumnoData);
    } else {
      this.crearAlumno(alumnoData);
    }
  }

  crearAlumno(alumno: any) {
    this.alumnosService.createAlumno(alumno).subscribe(response => {
      this.presentToast('Alumno creado exitosamente');
      this.alumnos.push(response);
      this.limpiar();
    }, error => {
      console.error('Error creando alumno:', error);
      this.presentToast('Error creando alumno');
    });
  }

  obtenerAlumnos() {
    this.alumnosService.getAlumnos().subscribe(response => {
      this.alumnos = response;
    }, error => {
      console.error('Error obteniendo alumnos:', error);
      this.presentToast('Error obteniendo alumnos');
    });
  }

  actualizarAlumno(id: number, alumno: any) {
    this.alumnosService.updateAlumno(id, alumno).subscribe(response => {
      console.log('Alumno actualizado:', response);
      this.presentToast('Alumno actualizado exitosamente');
      const index = this.alumnos.findIndex(a => a.id === id);
      if (index !== -1) {
        this.alumnos[index] = response;
      }
      this.limpiar();
    }, error => {
      console.error('Error actualizando alumno:', error);
      this.presentToast('Error actualizando alumno');
    });
  }

  eliminarAlumno(id: number) {
    this.alumnosService.deleteAlumno(id).subscribe(response => {
      console.log('Alumno eliminado:', response);
      this.presentToast('Alumno eliminado exitosamente');
      this.alumnos = this.alumnos.filter(a => a.id !== id);
    }, error => {
      console.error('Error eliminando alumno:', error);
      this.presentToast('Error eliminando alumno');
    });
  }

  seleccionarAlumno(alumno: any) {
    this.nombre = alumno.nombre;
    this.apellido = alumno.apellido;
    this.nivelEducacion = alumno.nivel_educacional;
    this.fechaNacimiento = alumno.fecha_nacimiento;
    this.selectedAlumnoId = alumno.id;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  }
}
