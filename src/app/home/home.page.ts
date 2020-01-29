import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Actividad } from '../actividad';

//library for social-sharing
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	quotes :any;

	actividadEditando: Actividad;
	arrayColeccionActividades: any = [{
		id: "",
		data: {} as Actividad,

	}];
	idActividadSelec: string;

	private  apiUrl :string = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10"; //api url to retrieve 10 random quotes


	constructor(private firestoreService: FirestoreService,
				private router: Router,
				private socialSharing: SocialSharing		
		) {

		// Crear una actividad vacía
		this.actividadEditando = {} as Actividad;
		this.obtenerListaActividades();
	}

	navigateToActividad(id) {
		this.router.navigate(["/actividad/" + id]);

	}

	navigateToInfo() {
		this.router.navigate(["/info/"]);

	}

	navigateToMapa() {
		this.router.navigate(["/mapa/"]);

	}

	obtenerListaActividades() {
		this.firestoreService.consultar("actividades").subscribe((resultadoConsultaActividades) => {
			this.arrayColeccionActividades = [];
			resultadoConsultaActividades.forEach((datosActividad: any) => {
				this.arrayColeccionActividades.push({
					id: datosActividad.payload.doc.id,
					data: datosActividad.payload.doc.data(),


				});
			})
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

	mostrarFechaHora(fechaHora, duracion){
		let fechaInincial = new Date(fechaHora);
		let horaFinal = new Date(fechaInincial.getTime() + duracion*60000);

		let horaInicialStr =  fechaInincial.toLocaleDateString("es-ES",{hour: '2-digit', minute: '2-digit'});

		let horaFinalStr = horaFinal.toLocaleTimeString("es-ES",{hour: '2-digit', minute: '2-digit'});

		return horaInicialStr + " - " + horaFinalStr;


	}


}


