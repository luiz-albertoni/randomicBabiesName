import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/Rx';

import { IonicStorageModule } from '@ionic/storage';

import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseProvider {

  database:SQLiteObject;

  private databaseReady:BehaviorSubject<boolean>;


    constructor(public http: Http, private sqlitePorter: SQLitePorter, private storage: Storage,  private sqlite: SQLite,  private platform: Platform) {

    this.databaseReady = new BehaviorSubject (false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'data.randomic_babe_name',
        location: 'default'
      })
          .then((db: SQLiteObject) => {
          this.database = db;
            this.storage.get('database_filled').then((val) =>{
              if(val) {

                this.databaseReady.next(true);

              } else {
                this.fillDatabase();
              }
            });
      });
    });
  }

  fillDatabase(){

    this.http.get('assets/nameBabesDump.sql')
        .map(res => res.text())
        .subscribe(sql =>{
            console.log(sql);
          this.sqlitePorter.importSqlToDb(this.database, sql)
              .then(data =>{
                this.databaseReady.next(true);
                this.storage.set('database_filled', true);
              })
              .catch(e => console.log(e.message));
        });
  }

  getAllBabesName(){
    return this.database.executeSql('SELECT * FROM baby_names',[])
    .then((data) => {

        var result = [];

        for(let i = 0; i < data.rows.length; i++) {
          result.push( {name : data.rows.item(i).name });
        }

        return  result;
    }).catch(e => console.log(e.message));
  }

  getBabesName(gender){
    let data = [];
    let query = 'SELECT * FROM baby_names  ORDER BY RANDOM()  limit 1';

    if(gender == 'M' || gender == 'F'){
       data = [gender];
       query = 'SELECT * FROM baby_names  where gender = ? ORDER BY RANDOM()  limit 1';
    }
    
    return this.database.executeSql(query, data)
        .then((data) => {
        console.log(data.rows.item(0));
            return data.rows.item(0);
        }).catch(e => console.log(e.message));
    }


  getMyList(){
    return this.database.executeSql('SELECT * FROM baby_names where my_list = 1; ',[])
    .then((data) => {
        return  data;
    }).catch(e => console.log(e.message));
  }

  addBabeName(name){
    let data = [name];
    return this.database.executeSql("insert into baby_names(name) values ('?')", data )
        .then(res => {
                return res;
              })
        .catch(e => console.log(e));
  }

  addUser(nome, sobrenome, signo, data_nascimento ) {
      let data = [nome, sobrenome, signo, data_nascimento];
      console.log(data);
      return this.database.executeSql('INSERT INTO users ( name, lastname, signo, birthday) VALUES (?, ?, ?, ?)',data)
          .then((data) => {
              console.log('Insert done');
              return data;

          }).catch(e => console.log(e.message));
  }

  updateUser(id, nome, sobrenome, signo, data_nascimento ) {
      let data = [nome, sobrenome, signo, data_nascimento];
      console.log(data);
      return this.database.executeSql('UPDATE users SET  name=?, lastname=?, signo=?, birthday=?  WHERE id = '+id,data)
          .then((data) => {
              console.log('Update Done');
              return data;

          }).catch(e => console.log(e.message));
  }


    updateMyList(id, isInMyList ) {
        let data = [isInMyList];
        return this.database.executeSql('UPDATE baby_names SET  my_list=?  WHERE id = '+id, data)
            .then((data) => {
                console.log('Update Done');
                return data;

            }).catch(e => console.log(e.message));
    }

 getUser(){

     return this.database.executeSql('SELECT * FROM users limit 1',[])
         .then((data) => {
            return data;
         }).catch(e => console.log(e.message));
 }


 setUpDataCaseNull()
 {
   this.sqlite.create({
     name: 'data.randomic_babe_name',
     location: 'default'
   })
       .then((db: SQLiteObject) => {
       this.database = db;

   });
 }

  getdataBaseState(){
    return this.databaseReady.asObservable();
  }

   dropAllTables(){
    this.http.get('assets/dropAll.sql')
        .map(res => res.text())
        .subscribe(sql =>{
            console.log(sql);
            this.sqlitePorter.importSqlToDb(this.database, sql)
                .then(data =>{
                    this.storage.set('database_filled', false);
                    this.databaseReady.next(false);
                })
                .catch(e => console.log(e.message));
        });
   }



}
