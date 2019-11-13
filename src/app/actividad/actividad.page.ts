import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Actividad } from '../actividad';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {
  id = null;
  actividadEditando: Actividad;
  idActividadSelec: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    this.actividadEditando = {};
  }

}
