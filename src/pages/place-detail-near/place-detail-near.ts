import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {PlaceService} from '../../providers/place-service-rest';
import {PlaceDetailPage} from '../place-detail/place-detail';

@Component({
    selector: 'page-place-detail-near',
    templateUrl: 'place-detail-near.html'
})
export class PlaceDetailNearPage {

    place: any;
    inputTime: any;
    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public PlaceService: PlaceService, public toastCtrl: ToastController) {
        this.place = this.navParams.data;
        PlaceService.findById(this.place.id).then(
            place => this.place = place
        );
        this.inputTime = this.place.time;
    }

    userUpdate(){
      //this.PlaceService.userUpdate(place.id,inputTime);
      this.navCtrl.pop()
      this.navCtrl.push(PlaceDetailPage, this.place)
    }
    userUpdateTime(place,wtime){
      //this.PlaceService.userUpdate(place.id,wtime)
    }

    favorite(place) {
        this.PlaceService.favorite(place)
            .then(place => {
                let toast = this.toastCtrl.create({
                    message: 'Place added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(place) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

}
