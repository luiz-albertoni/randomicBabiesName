import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DatabaseProvider }   from './../../providers/database/database';

@Component({
    selector: 'page-dev-area',
    templateUrl: 'devarea.html'
})
export class DevArea {

    constructor(public navCtrl: NavController, private databaseProvider: DatabaseProvider) {

    }

    dropAll() {
        console.log('Start Drop');
        this.databaseProvider.dropAllTables();
        this.databaseProvider.fillDatabase();
        console.log('Stop Drop');
    }
    
}
