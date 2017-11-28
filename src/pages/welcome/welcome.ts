import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {PlaceService} from '../../providers/place-service-rest';
import {PlaceDetailPage} from '../place-detail/place-detail';
import {PlaceDetailNearPage} from '../place-detail-near/place-detail-near';
import leaflet from 'leaflet';
import {AboutPage} from '../about/about';
import {Geolocation} from '@ionic-native/geolocation';

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

  constructor(public navCtrl: NavController, public service: PlaceService, public config: Config, private geolocation: Geolocation) {
      this.findAll();
      this.getFavorites();
  }


  onInput(event) {
       // Reset items back to all of the items
      this.places = this.placesForSearch;

      // set val to the value of the searchbar
      let val = this.searchKey;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.places = this.places.filter((place) => {
          return ((place.name.toLowerCase().indexOf(val.toLowerCase()) > -1) || (place.description.toLowerCase().indexOf(val.toLowerCase()) > -1));
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
      this.service.unfavorite(favorite).then(data => this.favorites = data)

  }

  getFavorites() {
      this.service.getFavorites()
          .then(data => this.favorites = data);
  }

  openAbout(){
      this.navCtrl.push(AboutPage)
    }


  getDistanceBetweenPoints(lat1, lon1, lat2, lon2){

    let R = 6371;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    d = d * 1000;
    return d;
  }

  toRad(x){
        return x * Math.PI / 180;
    }


  openPlaceDetail(place: any) {
      this.geolocation.getCurrentPosition().then((resp) => {
      let latitud = resp.coords.latitude
      let longitud = resp.coords.longitude
      if (this.getDistanceBetweenPoints(place.lat, place.lng, latitud, longitud) < 10000000){
        this.navCtrl.push(PlaceDetailNearPage, place);
      } else {
        this.navCtrl.push(PlaceDetailPage, place);
      }}).catch((error) => {
        console.log('Error getting location', error);
      });

  }

}
