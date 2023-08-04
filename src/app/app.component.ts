import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea } from './Interfaces/tarea';
import { TareaService } from './Services/tarea.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Variables
  listaTareas: Tarea[] = [];
  formularioTarea: FormGroup;
  prioridadDefault: string = 'Baja';


  constructor(
    private _tareaServicio: TareaService,
    private fb: FormBuilder
  ) {
    // Campos del formulario
    this.formularioTarea = this.fb.group({
      titulo: ['',[Validators.required, Validators.maxLength(17)]],
      descripcion: ['',[Validators.required, Validators.maxLength(17)]],
      prioridad: ['', Validators.required],
      estado: ['Pendiente']
    });
  }

  obtenerTareas() {
    this._tareaServicio.getAll().subscribe({
      next: (data) => {
        this.listaTareas = data;
      },
      error: (err) => {

      }
    });
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  agregarTarea() {
    const request: Tarea = {
      id: 0,
      titulo: this.formularioTarea.value.titulo,
      descripcion: this.formularioTarea.value.descripcion,
      prioridad: this.formularioTarea.value.prioridad,
      estado: this.formularioTarea.value.estado,
    }
    this._tareaServicio.create(request).subscribe({
      next: (data) => {
        this.listaTareas.push(data);
        this.formularioTarea.patchValue({
          titulo: '',
          descripcion: ''
        })
      },
      error: (err) => {

      }
    });
  }

  eliminarTarea(tarea: Tarea) {
    this._tareaServicio.delete(tarea.id).subscribe({
      next: (data) => {
        const nuevaLista = this.listaTareas.filter(item => item.id != tarea.id)
        this.listaTareas = nuevaLista;
      },
      error: (err) => {

      }
    });
  }
}


