import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { BattleAction } from 'app/shared/interfaces/battle/battle-action';
import { BattleTool } from 'app/shared/interfaces/battle/battle-tool';
import { getAttackForce, toolEffect } from 'app/shared/utils/battle.utils';
import { rand } from 'app/shared/utils/misc.utils';

import { Attack, Character } from '../../interfaces/character/character';

@Component({
  selector: 'app-battle',
  styleUrls: ['./battle.component.scss', './battle_animations.scss'],
  templateUrl: './battle.component.html',
})
export class BattleComponent implements OnInit {
  @Input() public ally: Character;
  @Input() public ennemy: Character;

  @ViewChild('allyAnimElement') public allyAnimElement;
  @ViewChild('ennemyAnimElement') public ennemyAnimElement;

  @Output() public battleEnded = new EventEmitter<string>();

  public chatText = '';

  public currentAllyAction: BattleAction = BattleAction.None;
  public currentAllyAttackAnim: string = null;
  public allyLife = 100;
  public allyPP = 100;

  public _canAllyMakeActions = true;
  public currentEnnemyAttackAnim: string = null;
  public ennemyLife = 100;
  public ennemyPP = 100;

  public ngOnInit(): void {
    if (this.ennemy.vit >= this.ally.vit) {
      this._playEnnemyTurn();
    }
    // this._playEnnemyTurn();
  }

  public _doAllyAttack(attack: Attack): void {
    this.chatText = '';

    if (attack.requis <= this.allyPP) {
      this.currentAllyAttackAnim = `anim_${attack.anim}`;

      const attackForceBoost = this._attackBoost;
      const attackPower =
        this._getAttackPower(attack, 'ally') + attackForceBoost;

      this._displayAllyAttackText(attack, attackPower, attackForceBoost);

      setTimeout(() => {
        const duration = this._allyAttackDuration;

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
        }, duration);
      }, 100);

      this.setActionToNone();
    } else {
      this._displayPPWarning();
    }
  }

  public _doEnnemyAttack(attack: Attack): void {
    this.currentEnnemyAttackAnim = `anim_${attack.anim}`;

    const attackForceBoost = this._attackBoost;
    const attackPower =
      this._getAttackPower(attack, 'ennemy') + attackForceBoost;

    this._displayEnnemyAttackText(attack, attackPower, attackForceBoost);

    setTimeout(() => {
      const duration = this._ennemyAttackDuration;

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
      }, duration);
    }, 100);
  }

  private get _attackBoost(): number {
    const randCriticalHit = rand(1, 10);
    return randCriticalHit === 8 ? 15 : 0;
  }

  private _displayAllyAttackText(
    attack: Attack,
    power: number,
    boost: number
  ): void {
    const criticalText = boost === 0 ? '' : `Coup critique !! <br />`;

    this.chatText = `
      ${criticalText}
      Vous avez attaqué l'adversaire avec ${attack.name} <br />
      L'adversaire a perdu ${power} points de vie <br />
      Vous avez perdu ${attack.requis} points de pouvoir
    `;
  }

  private _displayEnnemyAttackText(
    attack: Attack,
    power: number,
    boost: number
  ): void {
    const criticalText = boost === 0 ? '' : `Coup critique !! <br />`;

    this.chatText = `
      ${criticalText}
      'L'adversaire vous a attaqué avec ${attack.name} <br />
      'Vous avez perdu ${power} points de vie' <br />
      'L'adversaire a perdu ${attack.requis} points de pouvoir'
    `;
  }

  private get _ennemyAttackDuration(): number {
    const duration = window.getComputedStyle(
      this.allyAnimElement.nativeElement.firstElementChild
    ).animationDuration;

    return this._getIntDurationGivenCssDuration(duration);
  }

  private get _allyAttackDuration(): number {
    const duration = window.getComputedStyle(
      this.ennemyAnimElement.nativeElement.firstElementChild
    ).animationDuration;

    return this._getIntDurationGivenCssDuration(duration);
  }

  private _displayPPWarning(): void {
    this.chatText = 'Pas assez de PP pour utiliser cette attaque';
  }

  private _playAllyTurn(): void {
    this._canAllyMakeActions = true;
  }

  private _playEnnemyTurn(): void {
    this._canAllyMakeActions = false;

    setTimeout(() => {
      this._doEnnemyAttack(this.ennemy[`attack_${rand(1, 4)}`]);
    }, 2000);
  }

  private _endBattle(): void {
    this._canAllyMakeActions = false;
    this.ennemyLife = 100;
    this.ennemyPP = 100;
    this.allyLife = 100;
    this.allyPP = 100;

    this._allyWon ? this._endWithAllyAsWinner() : this._endWithEnnemyAsWinner();
  }

  private _endWithAllyAsWinner(): void {
    this.chatText = `
      Les points de vie de votre adversaire sont tombé à zéro. <br />
      Vous avez <span style="color:red;text-transform:uppercase;">gagné</span> !
    `;

    setTimeout(() => {
      this.battleEnded.emit('ally');
    }, 2000);
  }

  private _endWithEnnemyAsWinner(): void {
    this.chatText = `
      Vos points de vie sont tombé à zéro. <br />
      Vous avez <span style="color:red;text-transform:uppercase;">perdu</span> !
    `;

    setTimeout(() => {
      this.battleEnded.emit('ennemy');
    }, 2000);
  }

  private _useAllyTool(tool: BattleTool): void {
    this.allyLife = this.allyLife + toolEffect[tool].life;

    if (this.allyLife > 100) {
      this.allyLife = 100;
    }

    this.allyPP = this.allyPP + toolEffect[tool].pp;

    if (this.allyPP > 100) {
      this.allyPP = 100;
    }

    this.setActionToNone();
    this._playEnnemyTurn();
  }

  private _getIntDurationGivenCssDuration(animationDuration: string): number {
    return (
      Number(animationDuration.slice(0, animationDuration.length - 1)) * 1000
    );
  }

  private _getAttackPower(attack: Attack, who: string): number {
    return getAttackForce(
      attack.power,
      attack.type,
      who,
      this.ally,
      this.ennemy
    );
  }

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

  public useAllyToolLifePotion(): void {
    this._useAllyTool(BattleTool.LifePotion);
  }
  public useAllyToolPPPotion(): void {
    this._useAllyTool(BattleTool.PPPotion);
  }
  public useAllyToolDoublePotion(): void {
    this._useAllyTool(BattleTool.DoublePotion);
  }
  public useAllyToolShosinsui(): void {
    this._useAllyTool(BattleTool.Shoshinsui);
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
