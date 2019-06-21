import { Component, Input } from '@angular/core';

import { getAttackForce } from 'app/shared/utils/battle.utils';

import { Attack, Character } from '../../interfaces/character/character';

enum BattleAction {
  None = 'None',
  Attack = 'Attack',
  Tool = 'Tool',
}

enum Tool {
  LifePotion = 'LifePotion',
  PPPotion = 'PPPotion',
  DoublePotion = 'DoublePotion',
  Shoshinsui = 'Shoshinsui',
}

interface ToolEffect {
  life: number;
  pp: number;
}

const toolEffect: { [key: string]: ToolEffect } = {
  [Tool.LifePotion]: {
    life: 50,
    pp: 0,
  },
  [Tool.PPPotion]: {
    life: 0,
    pp: 50,
  },
  [Tool.DoublePotion]: {
    life: 25,
    pp: 25,
  },
  [Tool.Shoshinsui]: {
    life: 100,
    pp: -50,
  },
};

@Component({
  selector: 'app-battle',
  styleUrls: ['./battle.component.scss', './battle_animations.scss'],
  templateUrl: './battle.component.html',
})
export class BattleComponent {
  @Input() public ally: Character;
  @Input() public ennemy: Character;

  public chatText = '';

  public currentAllyAction: BattleAction = BattleAction.None;
  public currentAllyAttackAnim: string = null;
  public allyLife = 100;
  public allyPP = 100;

  public currentEnnemyAttackAnim: string = null;
  public ennemyLife = 100;
  public ennemyPP = 100;

  private _setAction(action: BattleAction): void {
    this.currentAllyAction = action;
  }

  public setActionToAttack(): void {
    this._setAction(BattleAction.Attack);
  }
  public setActionToTool(): void {
    this._setAction(BattleAction.Tool);
  }
  public setActionToNone(): void {
    this._setAction(BattleAction.None);
  }

  public _doAllyAttack(attack: Attack): void {
    this.currentAllyAttackAnim = `anim_${attack.anim}`;

    const attackPower = getAttackForce(
      attack.power,
      attack.type,
      'ally',
      this.ally,
      this.ennemy
    );

    this.chatText = `
      Vous avez attaqué l'adversaire avec ${attack.name} <br />
      L'adversaire a perdu ${attackPower} points de vie <br />
      Vous avez perdu ${attack.requis} points de pouvoir
    `;

    setTimeout(() => {
      this.currentAllyAttackAnim = null;
      this.chatText = '';

      this.allyPP = this.allyPP - attack.requis;
      this.ennemyLife = this.ennemyLife - attackPower;

      if (this._battleIsOver) {
        this._endBattle();
      } else {
        this._playEnnemyTurn();
      }
    }, 1000);

    this.setActionToNone();
  }

  public _doEnnemyAttack(attack: Attack): void {
    this.currentEnnemyAttackAnim = `anim_${attack.anim}`;

    const attackPower = getAttackForce(
      attack.power,
      attack.type,
      'ennemy',
      this.ally,
      this.ennemy
    );

    this.chatText = `
      'L'adversaire vous a attaqué avec ${attack.name}
      'Vous avez perdu ${attackPower} points de vie'
      'L'adversaire a perdu ${attack.requis} points de pouvoir'
    `;

    setTimeout(() => {
      this.currentEnnemyAttackAnim = null;
      this.chatText = '';

      this.ennemyPP = this.ennemyPP - attack.requis;
      this.allyLife = this.allyLife - attackPower;

      if (this._battleIsOver) {
        this._endBattle();
      } else {
        this._playAllyTurn();
      }
    }, 1000);
  }

  private _playAllyTurn(): void {}

  private _playEnnemyTurn(): void {
    // hideButtons(['tools', 'attack', 'depart']);
    // $('.button_return').hide();

    setTimeout(() => {
      const randomAttack = this.rand(1, 4);

      let ennemyAttack;

      switch (randomAttack) {
        case 1:
          ennemyAttack = this.ennemy.attack_1;
          break;
        case 2:
          ennemyAttack = this.ennemy.attack_2;
          break;
        case 3:
          ennemyAttack = this.ennemy.attack_3;
          break;
        case 4:
          ennemyAttack = this.ennemy.attack_4;
          break;

        default:
          ennemyAttack = this.ennemy.attack_1;
          break;
      }

      this._doEnnemyAttack(ennemyAttack);
    }, 2000);
  }

  private _endBattle(): void {
    console.log('ended');
  }

  public rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private _useAllyTool(tool: Tool): void {
    this.allyLife = this.allyLife + toolEffect[tool].life;

    if (this.allyLife > 100) {
      this.allyLife = 100;
    }

    this.allyPP = this.allyPP + toolEffect[tool].pp;

    if (this.allyPP > 100) {
      this.allyPP = 100;
    }

    this.setActionToNone();
  }

  public useAllyToolLifePotion(): void {
    this._useAllyTool(Tool.LifePotion);
  }
  public useAllyToolPPPotion(): void {
    this._useAllyTool(Tool.PPPotion);
  }
  public useAllyToolDoublePotion(): void {
    this._useAllyTool(Tool.DoublePotion);
  }
  public useAllyToolShosinsui(): void {
    this._useAllyTool(Tool.Shoshinsui);
  }

  public get _battleIsOver(): boolean {
    return this._allyWon || this._ennemyWon;
  }

  public get _allyWon(): boolean {
    return this.ennemyLife <= 0;
  }

  public get _ennemyWon(): boolean {
    return this.allyLife <= 0;
  }

  public get _allyPicture(): string {
    return `/assets/img/persos/${this.ally.img_front}`;
  }

  public get _ennemyPicture(): string {
    return `/assets/img/persos/${this.ennemy.img_front}`;
  }

  public get _actionIsAttack(): boolean {
    return this.currentAllyAction === BattleAction.Attack;
  }

  public get _actionIsNone(): boolean {
    return this.currentAllyAction === BattleAction.None;
  }

  public get _actionIsTool(): boolean {
    return this.currentAllyAction === BattleAction.Tool;
  }
}
