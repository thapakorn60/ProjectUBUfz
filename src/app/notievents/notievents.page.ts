import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-notievents',
  templateUrl: './notievents.page.html',
  styleUrls: ['./notievents.page.scss'],
})
export class NotieventsPage implements OnInit{

  constructor(public navCtrl: NavController) {}
  public technologies: Array<{ name: string, description: string }> = [
    {
       name : 'Angular',
       description : 'Google\'s front-end development framework - default option for Ionic development',
    },
    {
       name : 'VueJS',
       description : 'Latest cutting edge front-end development framework - can be enabled as an option for Ionic development',
    }
  ];
  public captureName(event: any): void
  {
     console.log(`Captured name by event value: ${event}`);
  }
  ngOnInit() {
  }

}
