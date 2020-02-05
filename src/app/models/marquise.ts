import { Bot, BotName } from './bot';

export class MarquiseBot extends Bot {

  public name: BotName = 'Marquise';

  public setupPosition = 'A';
  public setupRules = [
    `Form a supply of 25 warriors near you.`,

    `Place the keep token in a random corner clearing.`,

    `Place a warrior in each clearing, except the corner clearing diagonally opposite from the keep.
    Place an extra warrior in the clearing with the keep token. _(Place 12 warriors in total.)_`,

    `Place 1 sawmill, 1 workshop and 1 recruiter randomly among the clearing with the keep token and
    those clearings adjacent with up to one building per clearing.`,

    `Collect your remaining 15 buildings and place them near you.`
  ];

  public difficultyDescriptions = {
    Easy: `
Whenever you **Recruit**, instead place only two warriors.
    `,
    Normal: 'Nothing is changed.',
    Challenging: `
Whenever you **Recruit**, also place two warriors in the ordered clearing you rule of highest priority.
    `,
    Nightmare: `
Whenever you **Recruit**, also place two warriors in the ordered clearing you rule of highest priority.

At the end of evening, score **vp:1**.
    `
  };

  public rules = [
    {
      name: 'Poor Manual Dexterity',
      text: `You have no hand of cards. You cannot discard cards.
      If a human would take a card from you, they draw a card instead.
      If a human would give a card to you, they discard it, and you score **vp:1**.`,
      isActive: true
    },
    {
      name: 'Hates Surprises',
      text: 'Ambush cards cannot be played against you.',
      isActive: true
    },
    {
      name: 'The Keep',
      text: 'Only you can place pieces in the clearing with the keep token.',
      isActive: true
    },
    {
      name: 'Blitz',
      text: `
After you move, find the clearing you rule of the highest priority without any enemy pieces.

Move all but one warrior from the clearing. Then, battle in the destination clearing.
      `,
      canToggle: true
    },
    {
      name: 'Fortified',
      text: `
Your buildings each take two hits to remove.

Taking a single hit with a building has no effect.
      `,
      canToggle: true
    },
    {
      name: 'Hospitals',
      text: `At the end of battle as defender, if two or more Marquise warriors were removed
      in the battle, place two warriors in the clearing with the keep token.`,
      canToggle: true
    },
    {
      name: 'Iron Will',
      text: 'Whenever you **Recruit** in Escalated Daylight, place double the warriors.',
      canToggle: true
    }
  ];

  public customData = {
    currentSuit: 'bird',

    buildings: {
      fox: [],
      bunny: [],
      mouse: []
    }
  };

  public birdsong() {
    return [
      `Reveal an order card.`,
      `Craft order card for **vp:1** if it shows an available item.`
    ];
  }

  public daylight() {
    if (this.customData.currentSuit === 'bird') {
      return [
        `Battle in all clearings. _(Defender is the player with most pieces, then victory points.)_`,

        `Recruit two warriors in each of the two clearings you rule with lowest priority.
        If you only rule one clearing, place all four warriors there.`,

        `Build a building of the type with the most pieces on the map in a clearing you rule with the most Marquise Warriors.
        _(On a tie between sawmills and any other building types, place a sawmill.
          On a tie between workshops and recruiters but not sawmills, place a recruiter.)_`,

        `Move all but three of your warriors from each clearing to the adjacent clearing with the most enemy pieces.
        Then battle in each clearing you moved into.`
      ];
    }

    let building = '';
    if (this.customData.currentSuit === 'fox')   { building = 'sawmill'; }
    if (this.customData.currentSuit === 'bunny') { building = 'workshop'; }
    if (this.customData.currentSuit === 'mouse') { building = 'recruiter'; }

    return [
      `Battle in each **card:${this.customData.currentSuit}** clearing. _(Defender is the player with most pieces, then victory points.)_`,

      `Recruit four warriors evenly spread across **card:${this.customData.currentSuit}** clearings you rule.
      If you rule three **card:${this.customData.currentSuit}** clearings, place the fourth warrior in the
      **card:${this.customData.currentSuit}**
      clearing with the highest priority`,

      `Build a **building:${building}** in a clearing you rule with the most Marquise warriors.`,

      `Move all but three of your warriors from each **card:${this.customData.currentSuit}** clearing to the adjacent
      clearing with the most enemy pieces.`,

      `If you did not place a building this turn and have five or fewer buildings on the map, discard the order card,
      draw a new one, and repeat Daylight.`
    ];
  }

  public evening() {
    const buildings = this.customData.buildings;

    if (this.customData.currentSuit === 'bird') {

      const scores = ['fox', 'mouse', 'bunny'].map(suit => {
        return buildings[suit].reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1;
      });

      const maxScore = Math.max(...scores, 0);

      return [
        `Score ${maxScore} VP.`,
        `Discard the order card.`
      ];
    }

    const buildingsOfSuit = buildings[this.customData.currentSuit];

    const score = Math.max(0, buildingsOfSuit.reduce((prev, cur) => prev + (cur ? 1 : 0), 0) - 1);

    return [
      `Score ${score} VP.`,
      `Discard the order card.`
    ];
  }
}
