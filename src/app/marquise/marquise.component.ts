import { Component, OnInit, Input } from '@angular/core';
import { MarquiseBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-marquise',
  templateUrl: './marquise.component.html',
  styleUrls: ['./marquise.component.scss'],
})
export class MarquiseComponent implements OnInit {

  @Input() public bot: MarquiseBot;

  public buildings = [
    { suit: 'fox', building: 'sawmill' },
    { suit: 'bunny', building: 'workshop' },
    { suit: 'mouse', building: 'recruiter' }
  ];

  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    ['fox', 'bunny', 'mouse'].forEach(suit => {
      this.bot.customData.buildings[suit] = this.bot.customData.buildings[suit] || [];
    });
  }

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

  toggleBuilding(suit, index) {
    this.bot.customData.buildings[suit] = this.bot.customData.buildings[suit] || [];
    this.bot.customData.buildings[suit][index] = !this.bot.customData.buildings[suit][index];

    this.botService.saveBots();
  }

}
