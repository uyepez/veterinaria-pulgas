import { Component, OnDestroy} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { CitasService } from 'src/app/services/citas.service';
import { registroCita } from 'src/app/shared/interfaces/selectInterfaces';

import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnDestroy{

//NUEVA CITA
miCita: registroCita = <registroCita>{  }

//login de usuario
muestraLogin = false;
private subscription: Subscription;
error: any;

hours: string[] = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']; //horas disponibles
time = new FormControl();

//form registro
registroForm: FormGroup;
//form login
loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private citaService:CitasService, private router:Router) {
    //nos subscribimos para mostrar login
    this.subscription = this.loginService.muestraLogin$.subscribe(muestraLogin => {
      this.muestraLogin = muestraLogin;
    });

    //validacion del formulario de registro
    this.registroForm = this.fb.group({
      nombreCliente: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóúÑñ]*')]],
      nombreMascota: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-z A-Z ÁÉÍÓÚ 0-9áéíóúÑñ]*')]],
      telefono: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]],
      razonCita: ['', Validators.required],
      fechaCita: ['', Validators.required],
      horaCita: ['', Validators.required]
    });

    //validacion del formulario de login
    this.loginForm = this.fb.group({
      telefono: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      // si el fomulario es valido, se acumula la cita en el servicio
      this.miCita=this.registroForm.value;
      this.citaService.agendarCita(this.miCita);
      this.cambiaEstadoLogin(this.registroForm.get('telefono')?.value);

    }
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.cambiaEstadoLogin(this.loginForm.get('telefono')?.value);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cambiaEstadoLogin(telefono:any){
    this.loginService.iniciarSesion(telefono).subscribe(
          () => {
          // inicio de sesion correcto
          this.router.navigateByUrl("/citas");//mostramos la lista de citas
          this.error = null;
        },
        error => {
          // error
          this.error = error;
        }
      );
  }

}
