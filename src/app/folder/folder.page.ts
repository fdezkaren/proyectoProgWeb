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

  // Variable tipo string
  nombre: string = "Pablo";
  
  // Variable tipo number
  edad: number = 25;
  
  // Variable tipo boolean
  estaActivo: boolean = true;
  
  // Variable tipo array de strings
  nombres: string[] = ["Juan", "María", "Pedro"];
  
  // Variable tipo array de numbers
  edades: number[] = [25, 30, 35];
  
  // Variable tipo objeto
  persona: { nombre: string, edad: number } = { nombre: "Juan", edad: 25 };
  
  // Variable tipo array de objetos
  personas: { nombre: string, edad: number }[] = [
    { nombre: "Juan", edad: 25 },
    { nombre: "María", edad: 30 },
    { nombre: "Pedro", edad: 35 }
  ];
  
  // Variable tipo any (cualquier tipo)
  listar: any = [
    {
      edad: 1,
      apellido: "Rosales"
    }
  ]
  
  // Variable tipo null
  valorNulo: null = null;
  
  // Variable tipo undefined
  valorIndefinido: undefined = undefined;

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
