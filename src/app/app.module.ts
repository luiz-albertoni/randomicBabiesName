import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MyList } from '../pages/myList/myList';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ModalFlavio } from '../pages/modals/modal-flavio/modal-flavio';

import { DevArea } from '../pages/devarea/devarea';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { DatabaseProvider } from '../providers/database/database';
import { HttpModule} from '@angular/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { DatePicker } from '@ionic-native/date-picker';

@NgModule({
  declarations: [
    MyApp,
    MyList,
    ContactPage,
    HomePage,
    TabsPage,
    DevArea,
    ModalFlavio,
  ],
  imports: [
    BrowserModule,
      HttpModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [ 'sqlite', 'indexeddb']
    }),

    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyList,
    ContactPage,
    HomePage,
    TabsPage,
    DevArea,
    ModalFlavio
  ],
  providers: [
    StatusBar,
    SQLite,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
      HttpModule,
      SQLitePorter,
      DatePicker
  ]
})

export class AppModule {}
