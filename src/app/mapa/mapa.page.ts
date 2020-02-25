import { Map, tileLayer, marker } from 'leaflet';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage {
  map: Map;
  newMarker: any;
  address: string[];

  constructor(private router: Router) { }

  // The below function is added
  ionViewDidEnter() {
    this.loadMap();
  }
  // The below function is added
  loadMap() {
    this.map = new Map("mapId").setView([36.6772, -5.4461], 15);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>' })
      .addTo(this.map); 
      
      this.newMarker = marker([36.6772,-5.4461], {draggable: 
        true}).addTo(this.map);
  }
  goBack() {
    this.router.navigate(["home"]);
  }

  navigateToInfo() {
		this.router.navigate(["/info/"]);

	}




}
