import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Actividad } from '../actividad';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	actividadEditando: Actividad;
	arrayColeccionActividades: any = [{
		id: "",
		data: {} as Actividad
	}];
	idActividadSelec: string;


	constructor(private firestoreService: FirestoreService,
				private router: Router		
		) {

		// Crear una actividad vacía
		this.actividadEditando = {} as Actividad;
		this.obtenerListaActividades();
	}

	navigateToActividad(id) {
		this.router.navigate(["/actividad/" + id]);

	}

	obtenerListaActividades() {
		this.firestoreService.consultar("actividades").subscribe((resultadoConsultaActividades) => {
			this.arrayColeccionActividades = [];
			resultadoConsultaActividades.forEach((datosActividad: any) => {
				this.arrayColeccionActividades.push({
					id: datosActividad.payload.doc.id,
					data: datosActividad.payload.doc.data()
				});
			})
		});
	}


	clicBotonInsertar() {
		this.firestoreService.insertar("actividades", this.actividadEditando).then(() => {
			console.log('Actividad creada correctamente!');
			this.actividadEditando = {} as Actividad;
		}, (error) => {
			console.error(error);
		});
	}


	selecActividad(actividadSelec) {
		console.log("Actividad seleccionada: ");
		console.log(actividadSelec);
		this.idActividadSelec = actividadSelec.id;
		this.actividadEditando.nombre = actividadSelec.data.titulo;
		this.actividadEditando.fechaHora = actividadSelec.data.fechaHora;
		this.actividadEditando.aforo = actividadSelec.data.aforo;
		this.actividadEditando.ponente = actividadSelec.data.ponente;
		this.actividadEditando.direccion = actividadSelec.data.direccion;
		this.actividadEditando.localizacion = actividadSelec.data.localizacion;
		this.actividadEditando.foto = actividadSelec.data.foto;
	}

	clicBotonBorrar() {
		this.firestoreService.borrar("actividades", this.idActividadSelec).then(() => {
			// Actualizar la lista completa
			this.obtenerListaActividades();
			// Limpiar datos de pantalla
			this.actividadEditando = {} as Actividad;
		})
	}

}


