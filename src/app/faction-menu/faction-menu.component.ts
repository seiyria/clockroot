import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-faction-menu',
  templateUrl: './faction-menu.component.html',
  styleUrls: ['./faction-menu.component.scss'],
})
export class FactionMenuComponent implements OnInit {

  public factions = [
    {
      name: 'Automated Alliance',
      id: 'Woodland',
      icon: 'woodland'
    },
    {
      name: 'Electric Eyrie',
      id: 'Eyrie',
      icon: 'eyrie'
    },
    {
      name: 'Mechanical Marquise',
      id: 'Marquise',
      icon: 'marquise'
    },
    /*
    {
      name: 'Clockwork Cult',
      id: 'Cult',
      icon: 'cult',
      disabled: true
    },
    */
    /*
    {
      name: 'Otter Overlords',
      id: 'Riverfolk',
      icon: 'riverfolk',
      disabled: true
    },
    */
    {
      name: 'Robot Raccoon',
      id: 'Vagabond',
      icon: 'vagabond',
      disabled: true
    }
  ];

  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  close(res) {
    this.popoverCtrl.dismiss(res);
  }

}
