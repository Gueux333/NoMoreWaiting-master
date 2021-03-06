import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PlaceService} from '../../providers/place-service-rest';
import {PlaceDetailPage} from '../place-detail/place-detail';

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    favorites: Array<any>;

    constructor(public navCtrl: NavController, public service: PlaceService) {
        this.getFavorites();
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
