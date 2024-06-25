import { Component, OnInit } from '@angular/core';
import { ExperienciaLaboralService } from '../../app/services/experiencia-laboral.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
})
export class ExperienciaLaboralComponent implements OnInit {
  experiencias: any[] = [];
  empresa: string = '';
  anoInicio: string = '';
  trabajoActualmente: boolean = false;
  anoTermino: string = '';
  cargo: string = '';
  selectedExpericenciaId: number | null = null;

  constructor(
    private experienciaService: ExperienciaLaboralService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.obtenerExperiencia();
  }

  guardar() {
    const experienciaData = {
      empresa: this.empresa,
      anio_inicio: this.anoInicio,
      trabajoActualmente: this.trabajoActualmente,
      anio_termino: this.anoTermino,
      cargo: this.cargo,
    };
    if (this.selectedExpericenciaId) {
      this.actualizarExperiencia(this.selectedExpericenciaId, experienciaData);
    } else {
      this.agregarExperiencia(experienciaData);
    }
  }
  agregarExperiencia(experiencia: any) {
    this.experienciaService.agregarExperiencia(experiencia).subscribe(
      (response) => {
        this.presentToast('Experiencia creada exitosamente');
        this.experiencias.push(response);
      },
      (error) => {
        console.error('Error al agregar experiencia:', error);
        this.presentToast('Error creando experiencia');
      }
    );
  }
  obtenerExperiencia() {
    this.experienciaService.getExperiencias().subscribe(
      (response) => {
        this.experiencias = response;
      },
      (error) => {
        console.error('Error obteniendo experiencias:', error);
        this.presentToast('Error obteniendo experiencias');
      }
    );
  }
  actualizarExperiencia(id: number, experiencia: any) {
    this.experienciaService.actualizarExperiencia(id, experiencia).subscribe(
      (data) => {
        this.presentToast('Expericencia actualizado exitosamente');
        const index = this.experiencias.findIndex((e) => e.id === id);
        if (index !== -1) {
          this.experiencias[index] = data;
        }
      },
      (error) => {
        console.error('Error al actualizar experiencia:', error);
        this.presentToast('Error actualizando experiencia');
      }
    );
  }

  eliminarExperiencia(index: number) {
    const experiencia = this.experiencias[index];
    this.experienciaService.eliminarExperiencia(experiencia.id).subscribe(
      () => {
        this.experiencias.splice(index, 1);
      },
      (error) => {
        console.error('Error al eliminar experiencia:', error);
      }
    );
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
