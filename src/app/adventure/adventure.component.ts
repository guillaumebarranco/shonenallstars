import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';

import { ArcadeDispatcher } from 'app/arcade/arcade.dispatcher';
import { Character } from 'app/shared/interfaces/character/character';
import { AUTO, Game } from 'phaser';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { AdventureScene } from './adventure.scene';

declare type GamepadHapticActuator = any;

const actionsInGame$ = new Subject();
const actionsFromContainer$ = new Subject();

@Component({
  selector: 'app-adventure',
  styleUrls: ['./adventure.component.scss'],
  templateUrl: './adventure.component.html',
})
export class AdventureComponent implements OnInit {
  @select(['characters', 'list'])
  private readonly _characters$: Observable<Character[]>;

  public _component;
  public _game: Game;
  public _showBattle = false;
  public _allyCharacter: Character = null;
  public _ennemyCharacter: Character = null;

  constructor(private dispatcher: ArcadeDispatcher) {}

  public ngOnInit() {
    this.dispatcher.getCharacters();

    this._characters$
      .pipe(
        filter(characters => characters.length > 0),
        take(1)
      )
      .subscribe((characters: Character[]) => {
        const config: Phaser.Types.Core.GameConfig = {
          height: 500,
          physics: {
            arcade: {
              gravity: { y: 200 },
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
