import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {PlaceService} from "../providers/place-service-rest";
import {WelcomePage} from '../pages/welcome/welcome';

import {PlaceDetailPage} from '../pages/place-detail/place-detail';
import {PlaceDetailNearPage} from '../pages/place-detail-near/place-detail-near';
import {PlaceDetailThanksPage} from '../pages/place-detail-thanks/place-detail-thanks';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {AboutPage} from '../pages/about/about';

import {Geolocation} from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    AboutPage,
    PlaceDetailPage,
    PlaceDetailNearPage,
    PlaceDetailThanksPage,
    FavoriteListPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    AboutPage,
    PlaceDetailPage,
    PlaceDetailNearPage,
    PlaceDetailThanksPage,
    FavoriteListPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    PlaceService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
