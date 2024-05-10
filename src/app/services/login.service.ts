import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError  } from 'rxjs';
import { registroLogin } from '../shared/interfaces/selectInterfaces';
import { CitasService } from './citas.service';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _muestraLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  muestraLogin$: Observable<boolean> = this._muestraLogin.asObservable();

  private _estadoLogin: BehaviorSubject<registroLogin> = new BehaviorSubject<registroLogin>({ telefono: '', login: false });
  estadoLogin$: Observable<registroLogin> = this._estadoLogin.asObservable();

  constructor(private citaService: CitasService) { }

  //verifica si pide mostrar formulario de login
  usuarioExistente() {
    this._muestraLogin.next(true);
  }

  //verifica si pide mostrar formulario de registro
  usuarioNuevo() {
    this._muestraLogin.next(false);
  }


  //login de usuario
  iniciarSesion(telefono: string): Observable<any> {
    // Verificar si el numero de telefono existe en las citas
    const telefonoExiste = this.citaService.verificarTelefono(telefono);
    if (telefonoExiste) {
      this._estadoLogin.next({ telefono, login: true });
      return this.estadoLogin$; // observable con el estado del login
    } else {
      const error = 'Número de teléfono no encontrado.';
      console.error(error);
      return throwError(error); // error
    }
  }

  //cerrar sesión
  cerrarSesion() {
    this._estadoLogin.next({ telefono: '', login: false });
  }

  obtenerEstadoLogin(): Observable<registroLogin> {
    return this.estadoLogin$;
  }
}
