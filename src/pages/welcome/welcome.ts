import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {PlaceService} from '../../providers/place-service-rest';
import {PlaceDetailPage} from '../place-detail/place-detail';
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
  viewMode: string = "favorites";
  map;
  markersGroup;
  favorites: Array<any>;

  constructor(public navCtrl: NavController, public service: PlaceService, public config: Config, private geolocation: Geolocation) {
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
      this.service.unfavorite(favorite).then(data => this.favorites = data)
    
  }

  getFavorites() {
      this.service.getFavorites()
          .then(data => this.favorites = data);
  }

  openAbout(){
      this.navCtrl.push(AboutPage)
    }

  function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344 //  conversion en km
    dist = dist * 1000 // conversion en m
    return dist
  }


  openPlaceDetail(place: any) {
      this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      if (distance(place.lat, place.lng, resp.coords.latitude, resp.coords.longitude) > 100){
        this.navCtrl.push(PlaceDetailPage, place);
      } else {
        this.navCtrl.push(PlaceDetailPage, place);
      }
  }

}
