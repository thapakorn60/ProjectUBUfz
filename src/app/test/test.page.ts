import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { range } from 'rxjs';




@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  public isMe = true;
  // tslint:disable-next-line:variable-name
  public status_0 = true;
  // tslint:disable-next-line:variable-name
  public status_1 = false;
  constructor(public navCtrl: NavController) {

  }
  ngOnInit() {
    this.changeDisplayMethod('openR');
  }
  public toggle(): void{
    this.isMe = !this.isMe;
  }
  openR(){
    this.changeDisplayMethod('openR'); // declare like this

}
share(){
   this.changeDisplayMethod('share'); // declare like this

}
publish(){
   this.changeDisplayMethod('publish'); // declare like this

}
editData(){
   this.changeDisplayMethod('editData'); // declare like this

}
changeDisplayMethod(valueMethod){
   if ( valueMethod === 'openR'){
      this.status_0 = true;
      this.status_1 = false;
   }else if (valueMethod === 'view'){
      this.status_0 = true;
      this.status_1 = false;
  }else if (valueMethod === 'share'){
     this.status_0 = false;
     this.status_1 = true;
  }else if (valueMethod === 'publish'){
    this.status_0 = true;
    this.status_1 = false;
  }else if (valueMethod === 'copy'){
    this.status_0 = false;
    this.status_1 = true;
  }else if (valueMethod === 'editData'){
    this.status_0 = false;
    this.status_1 = true;
  }else if (valueMethod === 'updateData'){
    this.status_0 = false;
    this.status_1 = true;
  }else{
    this.status_0 = false;
    this.status_1 = true;
 }



}
}

