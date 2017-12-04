import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DatabaseProvider }   from './../../providers/database/database';

@Component({
  selector: 'page-myList',
  templateUrl: 'myList.html'
})
export class MyList {

  items = [];
  constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider,
              public alertCtrl: AlertController) {
    console.log('List');
  }

ionViewDidEnter() : any {
  this.reloadList();
}

reloadList() : any{

    this.databaseProvider.getdataBaseState().subscribe(response => {
      if(response){
        this.databaseProvider.getMyList().then(( data ) => {

          this.items = [];
        for(let i = 0; i < data.rows.length; i++)
        {
          this.items.push(data.rows.item(i));
        }
        });

      }
    });
}

removeFromList(itemId) : any {
  this.databaseProvider.getdataBaseState().subscribe(response => {
    if(response){
      this.databaseProvider.updateMyList(itemId, 0).then(( data ) => {
        this.reloadList();
      });
    }
  });
}

itemDescription(name, description) {
   let alert = this.alertCtrl.create({
     title: name,
     subTitle: '<br>'+description,
   });
   alert.present();
 }


}
