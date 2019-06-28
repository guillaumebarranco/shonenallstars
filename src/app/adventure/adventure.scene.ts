import { Character } from 'app/shared/interfaces/character/character';
import { Subject } from 'rxjs';

import { adventureAssets, getCloseObject } from './adventure.utils';

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

  constructor(config, characters, fromInGame$, actionsFromContainer$) {
    super(config);
    this.characters = characters;
    this.fromInGame$ = fromInGame$;
    this.actionsFromContainer$ = actionsFromContainer$;

    this.actionsFromContainer$.subscribe(a => this.actionsFromContainer(a));
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
    this._createPlayer();
    this._createBalls();
    this._createPeople();
    this._createTextElements();
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
      this._handleTalk();
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
      this.updateChapter();
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

  private _handleTalk(): void {
    if (this.canUpdate) {
      this.canUpdate = false;

      setTimeout(() => {
        this.canUpdate = true;
      }, 500);

      this._talk();
    }
  }

  private _makePlayerAction(): void {
    if (this.chapter === 0 && !this.ally && this.hasPreChosenAlly) {
      this.ally = this.allyToBeChosen;
      this.firstChapter();
      this._fromInGame(
        'chooseAlly',
        this.characters.find(c => c.id === this.ally)
      );
    }
  }

  private firstChapter(): void {
    this.chapter = 1;
    this.clearTxt();
    this.balls.clear(true, true);

    this.addPersoToScene(300, 200, 'korosensei');
    this.addPersoToScene(100, 100, 'rukia');
    this.addPersoToScene(450, 150, 'piccolo');
  }

  private secondChapter(): void {
    this.chapter = 2;
    this.clearTxt();
  }

  private thirdChapter(): void {
    this.chapter = 3;
    this.addPersoToScene(500, 100, 'korosensei');
  }

  private fourthChapter(): void {
    this.chapter = 4;
    this.addPersoToScene(1100, 200, 'yusuke');
    this.addPersoToScene(600, -400, 'saitama');
  }

  private fifthChapter(): void {
    this.chapter = 5;
    this.addPersoToScene(-300, 0, 'kenichi');
  }

  private sixthChapter(): void {
    this.chapter = 6;
    this.addPersoToScene(-400, 0, 'gon');
  }

  private seventhChapter(): void {
    this.chapter = 6;
  }

  private updateChapter(): void {
    switch (this.chapter) {
      case 1:
        this.secondChapter();
        break;
      case 2:
        this.thirdChapter();
        break;
      case 3:
        this.fourthChapter();
        break;
      case 4:
        this.fifthChapter();
        break;
      case 5:
        this.sixthChapter();
        break;
      case 6:
        this.seventhChapter();
        break;
      default:
        break;
    }
  }

  private showBattle(persoName: string): void {
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

  private _talk(): void {
    this.text.x = this.player.x - 100;
    this.text.y = this.player.y - 50;

    this.hasPreChosenAlly = false;

    if (this.balls.children.size !== 0) {
      this.text.y = this.player.y - 150;
    }

    switch (getCloseObject(this.balls, this.player, this.people)) {
      case 'ball1':
        this.txt(
          'Voulez-vous choisir Luffy, le pirate avide de liberté ? Appuyez sur entrée pour confirmer.'
        );
        this.hasPreChosenAlly = true;
        this.allyToBeChosen = 4;
        break;

      case 'ball2':
        this.txt(
          'Voulez-vous choisir Sangoku, le Super Saiyen ? Appuyez sur entrée pour confirmer.'
        );
        this.hasPreChosenAlly = true;
        this.allyToBeChosen = 1;
        break;

      case 'ball3':
        this.txt(
          'Voulez-vous choisir Naruto, le ninja légendaire ? Appuyez sur entrée pour confirmer.'
        );
        this.hasPreChosenAlly = true;
        this.allyToBeChosen = 15;
        break;

      case 'korosensei':
        if (this.chapter < 2) {
          if (this.stepTalk === 1) {
            this.txt('Bonjour, je suis Korosensei !');
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.txt('Je serais ton professeur de mangas.');
            this.showPass();
          } else if (this.stepTalk === 3) {
            this.txt('As-tu des questions ?');
            this.showPass();
            this.spoken.korosensei = true;
          } else if (this.stepTalk === 4) {
            this.finishTalking();
          }
        } else if (this.chapter === 2) {
          if (this.stepTalk === 1) {
            this.txt(
              'Maintenant que tu as effectué ton premier combat, ton apprentissage des mangas peut commencer !'
            );
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.txt('Le genre le plus lu de mangas est le style Shonen !');
            this.showPass();
          } else if (this.stepTalk === 3) {
            this.txt(
              'Tu va devoir combattre un héros emblématique pour comprendre ce dont je parle !'
            );
            this.showPass();
          } else if (this.stepTalk === 4) {
            this.txt('Es-tu prêt à combattre ?');
            this.stepTalk++;
          } else if (this.stepTalk === 5) {
            this.hidePass();
            this.showBattle('yugi');
          }

          // Yusuke
        } else if (this.chapter === 3) {
          if (this.stepTalk === 1) {
            this.txt(`Tu t'en es bien sorti, il ne te reste qu'une épreuve !`);
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.finishTalking();
          }

          // Kenichi
        } else if (this.chapter === 4) {
          if (this.stepTalk === 1) {
            this.txt(
              `La force Astrale t'attend désormais, seras-tu à la hauteur ?`
            );
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.finishTalking();
          }
        }

        break;

      case 'rukia':
        if (this.chapter < 3) {
          if (this.stepTalk === 1) {
            this.txt('Bonjour, je suis Rukia !');
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.txt('Je te guiderais à travers tes aventures.');
            this.showPass();
            this.spoken.rukia = true;
          } else if (this.stepTalk === 3) {
            this.finishTalking();
          }

          // Yusuke
        } else if (this.chapter === 3) {
          if (this.stepTalk === 1) {
            this.txt(`Bravo pour être arrivé jusqu'ici !`);
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.txt(
              'Pour ton dernier entraînement tu va avoir un adversaire coriace, tu es prêt ?'
            );
            this.showPass();
          } else if (this.stepTalk === 3) {
            this.txt(`C'est parti !`);

            setTimeout(function() {
              this.showBattle('yusuke');
              this.spoken.rukia = true;
              this.hidePass();
            }, 500);
          }

          // Kenichi
        } else if (this.chapter === 4) {
          if (this.stepTalk === 1) {
            this.txt('Tu trouveras ton chemin vers le nord-est.');
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.finishTalking();
          }
        } else if (this.chapter === 6 || this.chapter === 7) {
          if (this.stepTalk === 1) {
            this.txt(`L'énergie du Nen est puissante à l'ouest.`);
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.finishTalking();
            this.newChapter(8, 'win');
          }
        }

        break;

      case 'piccolo':
        if (this.chapter < 2) {
          // FOR TEST ONLY
          // this.spoken.korosensei = true;
          // this.spoken.rukia = true;

          if (this.spoken.korosensei && this.spoken.rukia) {
            if (this.battleResult) {
              if (this.stepTalk === 1) {
                this.txt('Un petit combat ?');
                this.showPass();
              } else if (this.stepTalk === 2) {
                this.finishTalking();
                this.showBattle('trial');
              }
            } else {
              if (this.stepTalk === 1) {
                this.txt('Tu veux retenter ta chance ?');
                this.showPass();
              } else if (this.stepTalk === 2) {
                this.finishTalking();
                this.showBattle('trial');
              }
            }
          } else {
            this.txt(`Je te conseille d'aller voir les autres d'abord`);
          }
        } else if (this.chapter === 2) {
          this.txt('Bravo !');
        } else if (this.chapter === 3) {
          if (this.stepTalk === 1) {
            this.txt(`Deux victoires à ton actif ! C'est un bon début !`);
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.txt(
              'Pour la fin de ton entraînement, tu devrais aller voir la guide !'
            );
            this.showPass();
          } else if (this.stepTalk === 3) {
            this.finishTalking();
          }
        } else if (this.chapter === 4) {
          if (this.stepTalk === 1) {
            this.txt(`Une nouvelle forme d'énergie est apparue.`);
            this.showPass();
          } else {
            this.txt('Mais avant cela, tu dois aller voir le grand Sage.');
            this.finishTalking();
          }
        }

        break;

      case 'saitama':
        if (this.chapter === 4) {
          if (this.stepTalk === 1) {
            this.txt('Bienvenue, héros. As-tu le temps pour un vieil homme ?');
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.txt(
              'La collision des énergies a commencé, un combat important va commencer.'
            );
            this.showPass();
          } else if (this.stepTalk === 3) {
            this.txt(`Il était dit qu'un héros viendrait avant la collision.`);
            this.showPass();
          } else if (this.stepTalk === 4) {
            this.txt(this.pseudo + ', tu as été choisi.');
            this.showPass();
          } else if (this.stepTalk === 5) {
            this.txt(`Ta mission consistera en l'harmonisation des énergies.`);
            this.showPass();
          } else if (this.stepTalk === 6) {
            this.txt(
              'Tu va devoir combattre beaucoup de puissants guerriers, es-tu prêt ?'
            );
            this.showPass();
          } else if (this.stepTalk === 7) {
            this.txt(
              `Parfait ! Tu trouveras ton ennemi en continuant sur l'ouest. Bonne chance.`
            );
            this.showPass();
          } else if (this.stepTalk === 8) {
            this.finishTalking();
            this.newChapter(6, 'win');
          }
        } else if (this.chapter === 5) {
          this.txt(
            `Tu trouveras ton ennemi en continuant sur l'ouest. Bonne chance.`
          );
        } else if (this.chapter === 6) {
          if (this.stepTalk === 1) {
            this.txt(
              `Tu as vaincu l'énergie des jeux, puis l'énergie astrale. Maintenant, l'énergie Combattive.`
            );
            this.showPass();
          } else if (this.stepTalk === 2) {
            this.txt(
              `Ton prochain adversaire pratique l'énergie du Nen, que la force soit avec toi.`
            );
            this.showPass();
          } else if (this.stepTalk === 3) {
            this.txt(`Je l'ai aperçu aux côtés de Rukia.`);
            this.showPass();
          } else if (this.stepTalk === 4) {
            this.finishTalking();
          }
        }

        break;

      /*
       *	ENNEMIS
       */

      case 'yugi':
        if (this.stepTalk === 1) {
          this.txt('Bonjour ' + this.pseudo);
          this.showPass();
        } else if (this.stepTalk === 2) {
          this.txt('Souhaites-tu me combattre ?');
          this.showPass();
        } else if (this.stepTalk === 3) {
          this.txt(`Parfait ! C'est l'heure du duel !`);
          this.showBattle('yugi');
          this.spoken.yugi = true;
          this.hidePass();
        }
        break;

      case 'toriko':
        if (this.stepTalk === 1) {
          this.txt(
            `J'avais le ventre vide, mais maintenant suis prêt à prendre ma revanche !`
          );
        } else if (this.stepTalk === 2) {
          this.txt('Parfait ! Itadakimasu !');
          this.showBattle('toriko');
          this.spoken.toriko = true;
          this.hidePass();
        }
        break;

      case 'yusuke':
        if (this.stepTalk === 1) {
          this.txt(
            'Mon énergie astrale a vacillé pour une seconde. Je veux combattre encore !'
          );
        } else if (this.stepTalk === 2) {
          this.txt('Tu va moins faire le malin cette fois !');
          this.showBattle('yusuke');
          this.spoken.yusuke = true;
          this.hidePass();
        }
        break;

      case 'kenichi':
        if (this.stepTalk === 1) {
          this.txt(
            `Une défaite n'es qu'un entraînement de plus. Cette fois je gagnerais.`
          );
          this.showPass();
        } else if (this.stepTalk === 2) {
          this.txt('Tu va me dire des nouvelles de mes techniques !');
          this.spoken.kenichi = true;
          this.hidePass();
          this.showBattle('kenichi');
        }
        break;

      case 'gon':
        if (this.stepTalk === 1) {
          this.txt(`Un hunter n'arrête jamais de courir après la victoire.`);
          this.showPass();
        } else if (this.stepTalk === 2) {
          this.txt('Janke, Go !');
          this.showBattle('gon');
          this.spoken.gon = true;
          this.hidePass();
        }
        break;

      case 'aladdin':
        if (this.stepTalk === 1) {
          this.txt(`As-tu envie d'un autre face-à-face ?`);
          this.showPass();
        } else if (this.stepTalk === 2) {
          this.txt('Faisons de notre mieux !');
          this.showBattle('aladdin');
          this.spoken.aladdin = true;
          this.hidePass();
        }
        break;

      case 'kenshin':
        if (this.stepTalk === 1) {
          this.txt('Je ne peux pas me permettre de perdre une nouvelle fois.');
          this.showPass();
        } else if (this.stepTalk === 2) {
          this.txt('Combattons.');
          this.showBattle('kenshin');
          this.spoken.kenshin = true;
          this.hidePass();
        }
        break;

      default:
        break;
    }
  }

  private _createPlayer(): void {
    this.player = this.physics.add.sprite(400, 500, 'perso');
    this.player.setCollideWorldBounds(true);
    this._createPlayerAnims();
  }

  private _createPlayerAnims(): void {
    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 3 }),
      key: 'left',
      repeat: -1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('perso', { start: 5, end: 8 }),
      key: 'right',
      repeat: -1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('perso', { start: 4, end: 4 }),
      key: 'up',
      repeat: -1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('perso', { start: 4, end: 4 }),
      key: 'down',
      repeat: -1,
    });
  }

  private _createBalls(): void {
    this.balls = this.physics.add.staticGroup();

    this.ball1 = this.balls.create(200, 350, 'ball');
    this.ball2 = this.balls.create(300, 350, 'ball');
    this.ball3 = this.balls.create(400, 350, 'ball');

    this.physics.add.collider(this.player, this.balls);
  }

  private _createPeople(): void {
    this.people = this.physics.add.staticGroup();
    this.physics.add.collider(this.player, this.people);
  }

  private _createTextElements(): void {
    this.text = this.add.text(100, 200, '', {
      fill: '#fff',
      fontSize: '16px',
      wordWrap: { width: 450, useAdvancedWrap: true },
    });

    this.passText = this.add.text(100, 200, '', {
      fill: '#fff',
      fontSize: '16px',
      wordWrap: { width: 450, useAdvancedWrap: true },
    });
  }

  private addPersoToScene(left: number, top: number, name: string): void {
    this.people.create(left, top, name);
  }

  private showPass(): void {
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

  private finishTalking(): void {
    this.clearTxt();
    this.hidePass();
  }
}