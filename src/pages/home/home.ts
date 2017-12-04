import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DatabaseProvider }   from './../../providers/database/database';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { ActionSheetController } from 'ionic-angular';
import { ModalController, ModalOptions } from 'ionic-angular';
import { ModalFlavio } from '../modals/modal-flavio/modal-flavio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  result : any;
  gender : any = 'N';
  private database:SQLiteObject;

  constructor(public navCtrl: NavController,  public navParams: NavParams,  private databaseProvider: DatabaseProvider,
              public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {

  }

  nextpage(){
    this.databaseProvider.getdataBaseState().subscribe(response => {
      if(response){
        this.databaseProvider.getUser().then(( data ) => {
          if(data.rows.length == 0){
            this.sendToast('Please fill the profile form before generate names!');
          }else{
            this.callFlavioModal();
          }
        });
      }
      return false;
    });
  }

  callFlavioModal(){

    let loader = this.loadingCtrl.create({
      content: "Calculating, please wait...",
      duration: 3000
    });

    loader.present();
    loader.dismiss().then(() => {
      let options: ModalOptions = {
          showBackdrop: false,
          enterAnimation: 'modal-md-slide-in',
          leaveAnimation: 'modal-md-slide-out',
        };

      let modal = this.modalCtrl.create( ModalFlavio, { gender: this.gender }, options);
      modal.present();
    });
  }

  sendToast(message) {
   let toast = this.toastCtrl.create({
     message: message,
     position: 'top',
     duration: 3000,
     showCloseButton : true,
     cssClass: "toast-error"
   });
    toast.present();
  }
}
