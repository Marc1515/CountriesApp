import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.css'],
})
export class CountryMapComponent implements OnInit, AfterViewInit {
  @Input() lat!: number;
  @Input() lng!: number;
  map!: mapboxgl.Map;

  constructor() {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor del mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [this.lng, this.lat], // Longitud y latitud del centro del mapa
      zoom: 5, // Nivel de zoom inicial
    });

    new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(this.map);
  }
}
