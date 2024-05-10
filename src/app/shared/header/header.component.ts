import { Component, HostListener  } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { registroLogin } from '../interfaces/selectInterfaces';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  private subscription: Subscription;

  //scroll
  scrolled = false;
  islogin = false;

  //login formulario
  muestraLogin = false;

  //login de usuario
  estadoLogin?: registroLogin;

  //notificaciones
  totalCitas = 0;

  constructor( private loginService: LoginService, private router:Router, private sitasService:CitasService) {
    //nos subscribimos para mostrar login
    this.subscription = this.loginService.muestraLogin$.subscribe(muestraLogin => {
      this.muestraLogin = muestraLogin;
    });
  }

  ngOnInit() {
    this.loginService.obtenerEstadoLogin().subscribe(estado => {
      this.estadoLogin = estado;
      console.log(this.estadoLogin.login);
    });

    //this.totalCitas = this.sitasService.numeroCitas();


  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition > 20) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }

  muestraLoginForm(muestra:boolean){
    if(muestra){
      this.loginService.usuarioExistente();
    }else{
      this.loginService.usuarioNuevo();
    }
    this.router.navigateByUrl('/registro');
  }

  salir(){
    this.loginService.cerrarSesion();
    this.router.navigateByUrl('/home');
  }

}
