import { Character } from 'app/shared/interfaces/character/character';
import { Subject } from 'rxjs';

import { adventureAssets } from './adventure.utils';
import { AdventureChapters } from './adventure.chapters';
import { AdventureTalk } from './adventure.talk';
import { AdventureCreate } from './adventure.create';

export class AdventureScene extends (Phaser.Scene as { new (config): any }) {
  public fromInGame$: Subject<any>;
  public actionsFromContainer$: Subject<any>;

  public load: any;
  public add: any;

  public characters: Character[];

  public player: Phaser.Physics.Arcade.Sprite;

  public people: Phaser.GameObjects.Group;
  public balls: Phaser.GameObjects.Group;
  public ball1: Phaser.GameObjects.GameObject;
  public ball2: Phaser.GameObjects.GameObject;
  public ball3: Phaser.GameObjects.GameObject;
  public passText: Phaser.GameObjects.Text;
  public text: Phaser.GameObjects.Text;
  public stepTalk = 1;
  public hasPreChosenAlly = false;
  public allyToBeChosen: number = null;
  public ally: number;
  public chapter = 0;
  public spoken: any = {};
  public canUpdate = true;
  public battleResult: boolean = null;

  private _adventureChaptersClass;
  private _adventureTalkClass;
  private _adventureCreateClass;

  constructor(config, characters, fromInGame$, actionsFromContainer$) {
    super(config);
    this.characters = characters;
    this.fromInGame$ = fromInGame$;
    this.actionsFromContainer$ = actionsFromContainer$;

    this.actionsFromContainer$.subscribe(a => this.actionsFromContainer(a));

    this._adventureChaptersClass = new AdventureChapters(this);
    this._adventureTalkClass = new AdventureTalk(this);
    this._adventureCreateClass = new AdventureCreate(this);
  }

  public preload(): void {
    this.load.spritesheet('perso', 'assets/img/assets/perso.png', {
      frameHeight: 48,
      frameWidth: 32,
    });

    adventureAssets.forEach(asset => {
      this.load.image(asset, `assets/img/assets/${asset}.png`);
      this.spoken[asset] = false;
    });
  }

  public create(): void {
    this._adventureCreateClass.createPlayer();
    this._adventureCreateClass.createBalls();
    this._adventureCreateClass.createPeople();
    this._adventureCreateClass.createTextElements();
  }

  public update(): void {
    const cursors = this.input.keyboard.createCursorKeys();

    this.player.setVelocityX(0);
    this.player.setVelocityY(0);

    if (cursors.left.isDown) {
      this._movePlayer('left');
    } else if (cursors.right.isDown) {
      this._movePlayer('right');
    } else if (cursors.up.isDown) {
      this._movePlayer('up');
    } else if (cursors.down.isDown) {
      this._movePlayer('down');
    } else if (cursors.space.isDown) {
      this._adventureTalkClass.handleTalk();
    } else if (cursors.shift.isDown) {
      this._makePlayerAction();
    } else {
      this.player.anims.stop();
    }
  }

  private _fromInGame(action: string, key: any): void {
    this.fromInGame$.next({
      action,
      key,
    });
  }

  private actionsFromContainer(value: { action: string; key: string }) {
    this.battleResult = null;

    if (value.action === 'battle') {
      this.battleResult = value.key === 'win' ? true : false;
    }

    if (this.battleResult) {
      this._adventureChaptersClass.updateChapter();
    }
  }

  private _movePlayer(direction: string): void {
    switch (direction) {
      case 'left':
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
        break;
      case 'right':
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
        break;
      case 'up':
        this.player.setVelocityY(-160);
        this.player.anims.play('up', true);
        break;
      case 'down':
        this.player.setVelocityY(160);
        this.player.anims.play('down', true);
        break;
      default:
        break;
    }
  }

  private _makePlayerAction(): void {
    if (this.chapter === 0 && !this.ally && this.hasPreChosenAlly) {
      this.ally = this.allyToBeChosen;
      this._adventureChaptersClass.firstChapter();
      this._fromInGame(
        'chooseAlly',
        this.characters.find(c => c.id === this.ally)
      );
    }
  }

  public showBattle(persoName: string): void {
    let perso;

    if (persoName === 'trial') {
      if (this.ally === 1) {
        perso = this.characters.find(c => c.id === 4);
      } else if (this.ally === 4) {
        perso = this.characters.find(c => c.id === 15);
      } else if (this.ally === 15) {
        perso = this.characters.find(c => c.id === 1);
      }
    } else {
      perso = this.characters.find(c => c.name === persoName);
    }

    this._fromInGame('battle', perso);
  }

  public addPersoToScene(left: number, top: number, name: string): void {
    this.people.create(left, top, name);
  }

  public showPass(): void {
    this.passText.x = this.player.x;
    this.passText.y = this.player.y - 100;
    this.passText.setText('Appuyer sur espace pour voir la suite');

    this.stepTalk++;
  }

  private hidePass(): void {
    this.passText.setText('');
    this.stepTalk = 1;
  }

  private clearTxt(): void {
    this.txt('');
  }

  private txt(content): void {
    this.text.setText(content);
  }

  public finishTalking(): void {
    this.clearTxt();
    this.hidePass();
  }
}
