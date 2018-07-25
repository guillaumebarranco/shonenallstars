import { Component, OnInit, Input } from '@angular/core';

import { Character } from '../../interfaces/character/character';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() ally: Character;
  @Input() ennemy: Character;

  constructor() {}
  ngOnInit() {}
}
