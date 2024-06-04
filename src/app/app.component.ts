import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: 'login', icon: 'log-in'},
    { title: 'Registrar', url: 'register', icon: 'person-add'},
    { title: 'Perfil', url: 'profile', icon: 'person-circle'}
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
