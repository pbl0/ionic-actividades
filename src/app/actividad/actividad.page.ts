import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Actividad } from '../actividad';
import { FirestoreService } from '../firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'app-actividad',
	templateUrl: './actividad.page.html',
	styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {
	id = null;
	idActividadSelec: string;

	document: any = {
		id: "",
		data: {} as Actividad
	};

	constructor(private activatedRoute: ActivatedRoute,
		private firestoreService: FirestoreService,
		private router: Router,
		public alertController: AlertController) {
		this.id = this.activatedRoute.snapshot.paramMap.get("id");
		this.firestoreService.consultarPorId("actividades", this.id).subscribe((resultado) => {
			// Preguntar si se hay encontrado un document con ese ID
			if (resultado.payload.data() != null) {
				this.document.id = resultado.payload.id
				this.document.data = resultado.payload.data();
				// Como ejemplo, mostrar el nombre de la tarea en consola
				console.log(this.document.data.nombre);
			} else {
				// No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
				this.document.data = {} as Actividad;
			}
		});
	}

	ngOnInit() {
		// this.id = this.activatedRoute.snapshot.paramMap.get("id");
	}

	clicBotonBorrar() {
		this.firestoreService.borrar("actividades", this.id).then(() => {

			// Limpiar datos de pantalla
			this.document.data = {} as Actividad;
		})
		this.navigateToHome();
	}

	clicBotonInsertar() {
		this.firestoreService.insertar("actividades", this.document.data).then(() => {
			console.log('Actividad creada correctamente!');
			this.document.data = {} as Actividad;
			this.navigateToHome();
		}, (error) => {
			console.error(error);
		});
	}

	clicBotonModificar() {
		this.firestoreService.actualizar("actividades", this.id, this.document.data).then(() => {
			this.document.data = {} as Actividad;
			this.navigateToHome();
		})
	}

	navigateToHome() {
		this.router.navigate(["/"]);

	}

	async presentAlertConfirmInsertar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres añadir la actividad <strong>'+ this.document.data.nombre +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToHome();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Guardar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonInsertar();
					}
				}
			]
		});

		await alert.present();
	}

	async presentAlertConfirmModificar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres confirmar los cambios en la actividad <strong>'+ this.document.data.nombre +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToHome();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Guardar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonModificar();
					}
				}
			]
		});

		await alert.present();
	}

	async presentAlertConfirmBorrar() {
		const alert = await this.alertController.create({
			header: 'Confirmar',
			message: '¿Quieres borrar la actividad <strong>'+ this.document.data.nombre +'</strong>?',
			buttons: [
				{
					text: 'Descartar',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
						this.navigateToHome();
					}
				},
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Guardar',
					handler: () => {
						console.log('Confirm Okay');
						this.clicBotonBorrar();
					}
				}
			]
		});

		await alert.present();
	}



}
