import { Component, OnInit } from '@angular/core';

import { AUTO, Game } from 'phaser';
import { Subject } from 'rxjs';

import { AdventureScene } from './adventure.scene';
import { Character, CharacterResponse } from '../shared/interfaces/character/character';
import { BattleComponent } from '../shared/components/battle/battle.component';
import { CommonModule } from '@angular/common';
import { ArcadeService } from '../arcade/arcade.service';

const actionsInGame$ = new Subject();
const actionsFromContainer$ = new Subject();

@Component({
  selector: 'app-adventure',
  styleUrls: ['./adventure.component.scss'],
  templateUrl: './adventure.component.html',
  standalone: true,
  imports: [BattleComponent, CommonModule,],
  providers: [ArcadeService]
})
export class AdventureComponent implements OnInit {

  public _component;
  public _game: Game;
  public _showBattle = false;
  public _allyCharacter: Character = null;
  public _ennemyCharacter: Character = null;

  constructor(private service: ArcadeService) {}

  public ngOnInit() {
    this.service.getCharacters().subscribe((response: CharacterResponse) => {
        const characters = response.persos;
        const config: Phaser.Types.Core.GameConfig = {
          height: 500,
          physics: {
            arcade: {
              gravity: { y: 200, x: 0 },
            },
            default: 'arcade',
          },
          type: AUTO,
          width: 700,
        };

        config.scene = new AdventureScene(
          config,
          characters,
          actionsInGame$,
          actionsFromContainer$
        );

        this._game = new Game(config);
      });

    this._fromInGame();
  }

  public _onBattleEnded(winner) {
    this._showBattle = false;
    actionsFromContainer$.next({
      action: 'battle',
      key: winner === 'ally' ? 'win' : 'lose',
    });
  }

  public _fromInGame(): void {
    actionsInGame$.subscribe((a: any) => {
      console.log('actionsInGame', a);
      const action = a.action;
      const key = a.key;

      if (action === 'chooseAlly') {
        this._allyCharacter = key;
      }

      if (action === 'battle') {
        this._showBattle = true;
        this._ennemyCharacter = key;
      }
    });
  }
}
