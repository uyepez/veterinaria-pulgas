import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { registroCita } from '../shared/interfaces/selectInterfaces';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  //acumulacion de citas
  private _citas: registroCita[] = [];
  citas$: BehaviorSubject<registroCita[]> = new BehaviorSubject<registroCita[]>([]);

  constructor() {
    this.cargarCitas(); //obtenemos las citas almecenadas
  }

  private cargarCitas() {
    const citasStr = localStorage.getItem('citas');
    if (citasStr) {
      this._citas = JSON.parse(citasStr);
      this.citas$.next(this._citas);
    }
  }

  private guardarCitas() {
    localStorage.setItem('citas', JSON.stringify(this._citas));
  }

  agendarCita(cita: registroCita) {
    this._citas.push(cita);
    this.guardarCitas(); // Guardar citas después de agregar una nueva
    this.citas$.next(this._citas);
  }

  eliminarCita(cita: registroCita) {
    const index = this._citas.indexOf(cita);
    if (index !== -1) {
      this._citas.splice(index, 1);
      this.guardarCitas(); // Guardar citas después de eliminar una
      this.citas$.next(this._citas);
    }
  }

  numeroCitas(){
    return this._citas.length;
  }

  //verificar si un número de teléfono existe en las citas para hacer login
  verificarTelefono(telefono: string): boolean {
    return this._citas.some(cita => cita.telefono === telefono);
  }

}
