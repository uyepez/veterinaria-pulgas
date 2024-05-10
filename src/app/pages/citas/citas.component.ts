import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { CitasService } from 'src/app/services/citas.service';
import { registroCita } from 'src/app/shared/interfaces/selectInterfaces';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
  ]
})
export class CitasComponent implements OnInit, OnDestroy {
  citas: registroCita[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private citaService: CitasService) { }

  ngOnInit() {
    this.subscription = this.citaService.citas$.subscribe(citas => {
      this.citas = citas;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  eliminarCita(cita: registroCita) {
    this.citaService.eliminarCita(cita);
    this.citas = this.citas.filter(c => c !== cita);
  }



}
