import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { AlertController, IonSegment, NavController, Platform, ToastController } from "@ionic/angular";
import { ExperienciaLaboralComponent } from "src/app/experiencia-laboral/experiencia-laboral.component";
import { MisDatosComponent } from "src/app/mis-datos/mis-datos.component";
import { CertificacionesComponent } from "src/app/certificaciones/certificaciones.component";
import { AlumnosService } from "src/app/services/alumnos.service"
import { AuthService } from '../../../app/services/auth.service';
import { Router } from '@angular/router';

interface SegmentChangeEventDetail {
  value?: string | null;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  selectedSegment: string = 'person';
  componentMap: { [key: string]: any } = {
    person: MisDatosComponent,
    briefcase: ExperienciaLaboralComponent,
    ribbon: CertificacionesComponent
  };
  @ViewChild('nombreInput', { static: false }) nombreInput: any;
  @ViewChild('apellidoInput', { static: false }) apellidoInput: any;
  @ViewChild(IonSegment, { static: true })
  segment!: IonSegment;
  alumnos: any[] = [];
  username: string = '';
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController,
    private alumnosService: AlumnosService,
    private platform: Platform
  ) { }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    if (this.selectedSegment === 'exit') {
      this.logout();
    }
  }

  getCurrentUser(): string | null {
    return this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || '';
    });
    this.segment.value = this.selectedSegment;
    this.alumnosService.getAlumnos().subscribe(data => {
      this.alumnos = data;
      console.log(data)
    }, error => {
      console.error('Error fetching alumnos', error);
    });
  }

  getComponent() {
    const component = this.componentMap[this.selectedSegment];
    return component || MisDatosComponent;
  }
}
