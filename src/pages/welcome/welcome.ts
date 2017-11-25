import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {PlaceService} from '../../providers/place-service-rest';
import {PlaceDetailPage} from '../place-detail/place-detail';
import leaflet from 'leaflet';
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {
  places: Array<any>;
  placesForSearch: Array<any>;
  searchKey: string = "";
  viewMode: string = "list";
  map;
  markersGroup;
  favorites: Array<any>;

  constructor(public navCtrl: NavController, public service: PlaceService, public config: Config) {
      this.findAll();
      this.getFavorites();
  }

  openPlaceDetail(place: any) {
      this.navCtrl.push(PlaceDetailPage, place);
  }

  onInput(event) {
       // Reset items back to all of the items
      this.places = this.placesForSearch;

      // set val to the value of the searchbar
      let val = this.searchKey;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.places = this.places.filter((place) => {
          return (place.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
  }

  onCancel(event) {
      this.findAll();
  }

  findAll() {
      this.service.findAll()
          .then(data => {
              this.places = data;
              this.placesForSearch = data;
          })
          .catch(error => alert(error));
  }

  placeMap() {
      setTimeout(() => {
          this.map = leaflet.map("map").setView([48.85, 2.35], 10);
          leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
              attribution: 'Tiles &copy; Esri'
          }).addTo(this.map);
          this.placeMarkers();
      })
  }

  placeMarkers() {
      if (this.markersGroup) {
          this.map.removeLayer(this.markersGroup);
      }
      this.markersGroup = leaflet.layerGroup([]);
      this.places.forEach(place => {
          if (place.lat, place.lng) {
              let marker: any = leaflet.marker([place.lat, place.lng]).on('click', event => this.openPlaceDetail(event.target.data));
              marker.data = place;
              this.markersGroup.addLayer(marker);
          }
      });
      this.map.addLayer(this.markersGroup);
  }
  itemTapped(favorite) {
      this.navCtrl.push(PlaceDetailPage, favorite.place);
  }

  deleteItem(favorite) {
      this.service.unfavorite(favorite)
          .then(() => {
              this.getFavorites();
          })
          .catch(error => alert(JSON.stringify(error)));
  }

  getFavorites() {
      this.service.getFavorites()
          .then(data => this.favorites = data);
  }

}
