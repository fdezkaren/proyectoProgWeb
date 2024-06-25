import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
})
export class CertificacionesComponent {

certificaciones: any[] = [];
  nuevaCertificacion: any = {
    nombre: '',
    fechaObtencion: null,
    tieneVencimiento: false,
    fechaVencimiento: null
  };

  agregarCertificacion() {
    this.certificaciones.push({...this.nuevaCertificacion});
    this.resetearFormulario();
  }

  eliminarCertificacion(index: number) {
    this.certificaciones.splice(index, 1);
  }

  resetearFormulario() {
    this.nuevaCertificacion = {
      nombre: '',
      fechaObtencion: null,
      tieneVencimiento: false,
      fechaVencimiento: null
    };
  }
}

