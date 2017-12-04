import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { DatabaseProvider }   from './../../providers/database/database';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public userInfo: {id: number, nome: string, sobrenome: string, signo: string, date: string}
   = {id: 1, nome: '', sobrenome: '', signo: '', date: ''};

  private todo : FormGroup;
  private database:SQLiteObject;
  private update:Boolean = false;

  constructor(public navCtrl: NavController, private datePicker: DatePicker, private formBuilder: FormBuilder,
     private databaseProvider: DatabaseProvider, private sqlite: SQLite, public toastCtrl: ToastController) {
  }

  ngOnInit(): any {

    this.todo = this.formBuilder.group({
         nome: [ '', Validators.required],
         sobrenome: ['', Validators.required],
         signo: ['', Validators.required],
         date: ['', Validators.required],
       });

       this.databaseProvider.getdataBaseState().subscribe(response => {
         if(response){
           this.databaseProvider.getUser().then(( data ) => {
             for(let i = 0; i < data.rows.length; i++)
             {
               this.userInfo.id = data.rows.item(i).id ;
               this.userInfo.nome = data.rows.item(i).name ;
               this.userInfo.sobrenome = data.rows.item(i).lastname ;
               this.userInfo.signo = data.rows.item(i).signo ;
               this.userInfo.date = data.rows.item(i).birthday ;
             }
             if(data.rows.length > 0){
                 this.update = true;
             }
           });

         }
       });

  }

  logForm()
  {
      //[nome, sobrenome, signo, data_nascimento];
      if(this.update){
        this.databaseProvider.updateUser(this.userInfo.id, this.todo.value.nome, this.todo.value.sobrenome, this.todo.value.signo, this.todo.value.date );
        this.sendToast('Success Updated!');
      } else {
        this.databaseProvider.addUser(this.todo.value.nome, this.todo.value.sobrenome, this.todo.value.signo, this.todo.value.date );
        this.sendToast('Success Created!');
      }
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
