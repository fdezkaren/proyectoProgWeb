import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  nombre: string = "Pablo";
  

  edad: number = 25;
  

  estaActivo: boolean = true;
  

  nombres: string[] = ["Juan", "María", "Pedro"];
  
 
  edades: number[] = [25, 30, 35];
  

  persona: { nombre: string, edad: number } = { nombre: "Juan", edad: 25 };
  

  personas: { nombre: string, edad: number }[] = [
    { nombre: "Juan", edad: 25 },
    { nombre: "María", edad: 30 },
    { nombre: "Pedro", edad: 35 }
  ];
  
 
  listar: any = [
    {
      edad: 1,
      apellido: "Rosales"
    }
  ]
  

  valorNulo: null = null;
  

  valorIndefinido: undefined = undefined;

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
