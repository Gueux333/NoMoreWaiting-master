import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SERVER_URL} from './config';
import 'rxjs/Rx';

let placesURL = SERVER_URL + 'api/places/';

@Injectable()
export class PlaceService {
  containPlaceID : Array<string>= []
  favorites: Array<any> = [];

    constructor(public http: Http) {
        this.http = http;
    }

    findAll() {
        return this.http.get(placesURL)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(placesURL + "id/" + id)
            .map(res => res.json())
            .toPromise();
    }

    getFavorites() {
        return Promise.resolve(this.favorites);
    }

    favorite(place) {
        let index = this.containPlaceID.indexOf(place.id);
        if (index == -1) {
          this.containPlaceID.push(place.id)
          this.favorites.push({id: place.id, place: place});
        }
        return Promise.resolve();

    }

    unfavorite(favorite) {
        let index = this.favorites.indexOf(favorite);
        if (index > -1) {
          this.favorites.splice(index, 1);
        }
        return Promise.resolve(this.favorites);
    }

    update(place) {
    }
}
