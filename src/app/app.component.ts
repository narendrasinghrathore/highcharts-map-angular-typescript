import { AfterViewInit, Component, OnInit } from '@angular/core';
// import * as L from 'leaflet';
// import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  // title = 'angular-leaflet';
  // mapInstance;
  // statesData;
  // geojson;

  // selectedCounties = [];

  // constructor(private service: AppService) {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    // const maxBounds = L.latLngBounds(
    //   L.latLng(5.49955, -167.276413), //Southwest
    //   L.latLng(83.162102, -52.23304) //Northeast
    // );
    //   this.mapInstance = L.map('map', {
    //     center: [0, 0],
    //     zoom: 5,
    //     maxBounds: maxBounds,
    //   }).fitBounds(maxBounds);
    //   const tiles = L.tileLayer(
    //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //     {
    //       detectRetina: true,
    //       maxZoom: 7,
    //       attribution:
    //         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //     }
    //   );
    //   tiles.addTo(this.mapInstance);
    //   this.bindStateData();
  }

  // isSelected(name: string) {
  //   return this.selectedCounties.find((i) => i === name);
  // }

  // getColor(d) {
  //   return d > 1000
  //     ? '#800026'
  //     : d > 500
  //     ? '#BD0026'
  //     : d > 200
  //     ? '#E31A1C'
  //     : d > 100
  //     ? '#FC4E2A'
  //     : d > 50
  //     ? '#FD8D3C'
  //     : d > 20
  //     ? '#FEB24C'
  //     : d > 10
  //     ? '#FED976'
  //     : '#FFEDA0';
  // }

  // style(feature) {
  //   return {
  //     fillColor: '#dedede', //this.getColor(feature.properties.density),
  //     weight: 1,
  //     opacity: 1,
  //     color: '#999',
  //     dashArray: '1',
  //     fillOpacity: 0,
  //   };
  // }

  // highlightFeature(e) {
  //   const layer = e.target;
  //   layer.setStyle({
  //     weight: 1,
  //     color: '#000',
  //     dashArray: '',
  //     fillOpacity: 0,
  //   });

  //   if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
  //     layer.bringToFront();
  //   }
  // }

  // addSelected(name: string) {
  //   this.selectedCounties.push(name);
  // }

  // removeSelected(name: string) {
  //   this.selectedCounties = this.selectedCounties.filter(
  //     (item) => item !== name
  //   );
  // }

  // resetHighlight(e) {
  //   this.geojson.resetStyle(e.target);
  // }

  // highlightSelected(e) {
  //   const name = e.target.feature.properties.name;
  //   if (this.isSelected(name)) {
  //     // remove selected from list
  //     this.removeSelected(name);
  //     this.resetHighlight(e);
  //     return;
  //   }
  //   this.addSelected(name);
  //   this.highlightFeature(e);
  // }

  // zoomToFeature(e) {
  //   this.mapInstance.fitBounds(e.target.getBounds());
  // }

  // onEachFeature(feature, layer) {
  //   layer.on({
  //     // mouseover: (e) => this.highlightFeature(e),
  //     // mouseout: (e) => this.resetHighlight(e),
  //     click: (e) => this.highlightSelected(e),
  //   });
  // }

  // bindStateData() {
  //   this.service.getJson('data').subscribe(
  //     (data) => {
  //       this.statesData = data;
  //     },
  //     () => {
  //       //error
  //     },
  //     () => {
  //       // this.geojson = L.GeoJSON.extend({
  //       //   addData: function(jsonData) {
  //       //     if (jsonData.type === "Topology") {
  //       //       for (let key in jsonData.objects) {
  //       //         this.geojson = topojson.feature(jsonData, jsonData.objects[key]);
  //       //         L.GeoJSON.prototype.addData.call(this, geojson);
  //       //       }
  //       //     }
  //       //     else {
  //       //       L.GeoJSON.prototype.addData.call(this, jsonData);
  //       //     }
  //       //   }   }
  //       //   );
  //       this.geojson = L.geoJSON(this.statesData, {
  //         style: (data) => this.style(data),
  //         onEachFeature: (feature, layer) => this.onEachFeature(feature, layer),
  //       }).addTo(this.mapInstance);
  //     }
  //   );
  // }
}
