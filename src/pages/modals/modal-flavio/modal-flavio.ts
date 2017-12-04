import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider }   from './../../../providers/database/database';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { ActionSheetController, ViewController, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'modal-flavio',
  templateUrl: 'modal-flavio.html'
})
export class ModalFlavio {


  public baby: {id: number, name: string, gender: string, description: string}
   = {id: 1, name: '', gender: '', description: ''};

   gender : any = 'N';

  constructor(public navCtrl: NavController,  public navParams: NavParams,  private databaseProvider: DatabaseProvider,
              public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController, public viewCtrl: ViewController,
              private sqlite: SQLite, public toastCtrl: ToastController) {
                this.gender = navParams.get('gender');

  }

  ngOnInit(): any {
    this.getBabyName();
  }

  getBabyName(){
    this.databaseProvider.getdataBaseState().subscribe(response => {
      if(response){
        this.databaseProvider.getBabesName(this.gender).then(( data ) => {
          this.baby.name = data.name;
          this.baby.id = data.id;
          this.baby.description = data.description;
        });

      }
    });
  }

  dismiss() {
      this.viewCtrl.dismiss();
    }

  addToMyList() {
    this.databaseProvider.getdataBaseState().subscribe(response => {
      if(response){
        this.databaseProvider.updateMyList(this.baby.id , 1).then(( data ) => {
          this.sendToast('Success Add!');
        });

      }
    });
  }

  sendToast(message) {
   let toast = this.toastCtrl.create({
     message: message,
     position: 'top',
     duration: 3000,
     showCloseButton : true,
     cssClass: "toast-success"
   });
    toast.present();
 }

}
