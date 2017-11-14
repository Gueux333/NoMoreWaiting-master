import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {WelcomePage} from '../pages/welcome/welcome';
import {PlaceListPage} from '../pages/place-list/place-list';
import {PlaceDetailPage} from '../pages/place-detail/place-detail';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {AboutPage} from '../pages/about/about';

import {PlaceService} from "../providers/place-service-rest";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    AboutPage,
    PlaceListPage,
    PlaceDetailPage,
    FavoriteListPage
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
    PlaceListPage,
    PlaceDetailPage,
    FavoriteListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PlaceService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
