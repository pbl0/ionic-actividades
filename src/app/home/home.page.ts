import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Actividad } from '../actividad';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';


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

	userEmail: String = "";
	userUID: String = "";
	isLogged: boolean;

	private  apiUrl :string = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10"; //api url to retrieve 10 random quotes


	constructor(private firestoreService: FirestoreService,
				private router: Router,
				private socialSharing: SocialSharing,
				private authService: AuthService,
				public afAuth: AngularFireAuth,
				private toastController: ToastController
				
		) {

		// Crear una actividad vacía
		this.actividadEditando = {} as Actividad;
		this.obtenerListaActividades();
	}

	ionViewDidEnter() {
		this.isLogged = false;
		this.afAuth.user.subscribe(user => {
		  if(user){
			this.userEmail = user.email;
			this.userUID = user.uid;
			this.isLogged = true;
		  }
		})
	  }

	  async logout(){
		const toast = await this.toastController.create({
			message: 'Has cerrado sesión',
			duration: 3000
		});
		
		this.authService.doLogout()
		.then(res => {
		  this.userEmail = "";
		  this.userUID = "";
		  this.isLogged = false;
		  console.log(this.userEmail);
		  toast.present();
		}, err => console.log(err));
	  }

	navigateToActividad(id) {
		if (this.userUID !== ""){
			this.router.navigate(["/actividad/" + id]);
		}
		

	}

	navigateToInfo() {
		this.router.navigate(["/info/"]);

	}

	navigateToMapa() {
		this.router.navigate(["/mapa/"]);

	}

	navigateToLogin() {
		this.router.navigate(["/login/"]);

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


