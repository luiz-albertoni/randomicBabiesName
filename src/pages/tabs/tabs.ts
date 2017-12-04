import { Component, ViewChild } from '@angular/core';

import { MyList } from '../myList/myList';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { DevArea } from '../devarea/devarea';

import { NavController, Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage  {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = HomePage;
  tab3Root = ContactPage;
  tab4Root = DevArea;
  tab2Root = MyList;

  constructor(public navCtrl: NavController) {
   // this.tabRef.select(2);

    //this.navCtrl.push(AboutPage);
  }

  ionViewDidEnter() {
    //this.tabRef.select(1);
  }
}
