import { getCloseObject } from './adventure.utils';

export class AdventureTalk {
  public parent;

  constructor(parent) {
    this.parent = parent;
  }

  public handleTalk(): void {
    if (this.parent.canUpdate) {
      this.parent.canUpdate = false;

      setTimeout(() => {
        this.parent.canUpdate = true;
      }, 500);

      this._talk();
    }
  }

  private _talk(): void {
    this.parent.text.x = this.parent.player.x - 100;
    this.parent.text.y = this.parent.player.y - 50;

    this.parent.hasPreChosenAlly = false;

    if (this.parent.balls.children.size !== 0) {
      this.parent.text.y = this.parent.player.y - 150;
    }

    switch (
      getCloseObject(this.parent.balls, this.parent.player, this.parent.people)
    ) {
      case 'ball1':
        this.parent.txt(
          'Voulez-vous choisir Luffy, le pirate avide de liberté ? Appuyez sur entrée pour confirmer.'
        );
        this.parent.hasPreChosenAlly = true;
        this.parent.allyToBeChosen = 4;
        break;

      case 'ball2':
        this.parent.txt(
          'Voulez-vous choisir Sangoku, le Super Saiyen ? Appuyez sur entrée pour confirmer.'
        );
        this.parent.hasPreChosenAlly = true;
        this.parent.allyToBeChosen = 1;
        break;

      case 'ball3':
        this.parent.txt(
          'Voulez-vous choisir Naruto, le ninja légendaire ? Appuyez sur entrée pour confirmer.'
        );
        this.parent.hasPreChosenAlly = true;
        this.parent.allyToBeChosen = 15;
        break;

      case 'korosensei':
        if (this.parent.chapter < 2) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt('Bonjour, je suis Korosensei !');
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.txt('Je serais ton professeur de mangas.');
            this.parent.showPass();
          } else if (this.parent.stepTalk === 3) {
            this.parent.txt('As-tu des questions ?');
            this.parent.showPass();
            this.parent.spoken.korosensei = true;
          } else if (this.parent.stepTalk === 4) {
            this.parent.finishTalking();
          }
        } else if (this.parent.chapter === 2) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt(
              'Maintenant que tu as effectué ton premier combat, ton apprentissage des mangas peut commencer !'
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.txt(
              'Le genre le plus lu de mangas est le style Shonen !'
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 3) {
            this.parent.txt(
              'Tu va devoir combattre un héros emblématique pour comprendre ce dont je parle !'
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 4) {
            this.parent.txt('Es-tu prêt à combattre ?');
            this.parent.stepTalk++;
          } else if (this.parent.stepTalk === 5) {
            this.parent.hidePass();
            this.parent.showBattle('yugi');
          }

          // Yusuke
        } else if (this.parent.chapter === 3) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt(
              `Tu t'en es bien sorti, il ne te reste qu'une épreuve !`
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.finishTalking();
          }

          // Kenichi
        } else if (this.parent.chapter === 4) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt(
              `La force Astrale t'attend désormais, seras-tu à la hauteur ?`
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.finishTalking();
          }
        }

        break;

      case 'rukia':
        if (this.parent.chapter < 3) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt('Bonjour, je suis Rukia !');
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.txt('Je te guiderais à travers tes aventures.');
            this.parent.showPass();
            this.parent.spoken.rukia = true;
          } else if (this.parent.stepTalk === 3) {
            this.parent.finishTalking();
          }

          // Yusuke
        } else if (this.parent.chapter === 3) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt(`Bravo pour être arrivé jusqu'ici !`);
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.txt(
              'Pour ton dernier entraînement tu va avoir un adversaire coriace, tu es prêt ?'
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 3) {
            this.parent.txt(`C'est parti !`);

            setTimeout(function() {
              this.parent.showBattle('yusuke');
              this.parent.spoken.rukia = true;
              this.parent.hidePass();
            }, 500);
          }

          // Kenichi
        } else if (this.parent.chapter === 4) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt('Tu trouveras ton chemin vers le nord-est.');
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.finishTalking();
          }
        } else if (this.parent.chapter === 6 || this.parent.chapter === 7) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt(`L'énergie du Nen est puissante à l'ouest.`);
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.finishTalking();
            this.parent.newChapter(8, 'win');
          }
        }

        break;

      case 'piccolo':
        if (this.parent.chapter < 2) {
          // FOR TEST ONLY
          // this.parent.spoken.korosensei = true;
          // this.parent.spoken.rukia = true;

          if (this.parent.spoken.korosensei && this.parent.spoken.rukia) {
            if (this.parent.battleResult) {
              if (this.parent.stepTalk === 1) {
                this.parent.txt('Un petit combat ?');
                this.parent.showPass();
              } else if (this.parent.stepTalk === 2) {
                this.parent.finishTalking();
                this.parent.showBattle('trial');
              }
            } else {
              if (this.parent.stepTalk === 1) {
                this.parent.txt('Tu veux retenter ta chance ?');
                this.parent.showPass();
              } else if (this.parent.stepTalk === 2) {
                this.parent.finishTalking();
                this.parent.showBattle('trial');
              }
            }
          } else {
            this.parent.txt(`Je te conseille d'aller voir les autres d'abord`);
          }
        } else if (this.parent.chapter === 2) {
          this.parent.txt('Bravo !');
        } else if (this.parent.chapter === 3) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt(
              `Deux victoires à ton actif ! C'est un bon début !`
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.txt(
              'Pour la fin de ton entraînement, tu devrais aller voir la guide !'
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 3) {
            this.parent.finishTalking();
          }
        } else if (this.parent.chapter === 4) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt(`Une nouvelle forme d'énergie est apparue.`);
            this.parent.showPass();
          } else {
            this.parent.txt(
              'Mais avant cela, tu dois aller voir le grand Sage.'
            );
            this.parent.finishTalking();
          }
        }

        break;

      case 'saitama':
        if (this.parent.chapter === 4) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt(
              'Bienvenue, héros. As-tu le temps pour un vieil homme ?'
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.txt(
              'La collision des énergies a commencé, un combat important va commencer.'
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 3) {
            this.parent.txt(
              `Il était dit qu'un héros viendrait avant la collision.`
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 4) {
            this.parent.txt(this.parent.pseudo + ', tu as été choisi.');
            this.parent.showPass();
          } else if (this.parent.stepTalk === 5) {
            this.parent.txt(
              `Ta mission consistera en l'harmonisation des énergies.`
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 6) {
            this.parent.txt(
              'Tu va devoir combattre beaucoup de puissants guerriers, es-tu prêt ?'
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 7) {
            this.parent.txt(
              `Parfait ! Tu trouveras ton ennemi en continuant sur l'ouest. Bonne chance.`
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 8) {
            this.parent.finishTalking();
            this.parent.newChapter(6, 'win');
          }
        } else if (this.parent.chapter === 5) {
          this.parent.txt(
            `Tu trouveras ton ennemi en continuant sur l'ouest. Bonne chance.`
          );
        } else if (this.parent.chapter === 6) {
          if (this.parent.stepTalk === 1) {
            this.parent.txt(
              `Tu as vaincu l'énergie des jeux, puis l'énergie astrale. Maintenant, l'énergie Combattive.`
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 2) {
            this.parent.txt(
              `Ton prochain adversaire pratique l'énergie du Nen, que la force soit avec toi.`
            );
            this.parent.showPass();
          } else if (this.parent.stepTalk === 3) {
            this.parent.txt(`Je l'ai aperçu aux côtés de Rukia.`);
            this.parent.showPass();
          } else if (this.parent.stepTalk === 4) {
            this.parent.finishTalking();
          }
        }

        break;

      /*
       *	ENNEMIS
       */

      case 'yugi':
        if (this.parent.stepTalk === 1) {
          this.parent.txt('Bonjour ' + this.parent.pseudo);
          this.parent.showPass();
        } else if (this.parent.stepTalk === 2) {
          this.parent.txt('Souhaites-tu me combattre ?');
          this.parent.showPass();
        } else if (this.parent.stepTalk === 3) {
          this.parent.txt(`Parfait ! C'est l'heure du duel !`);
          this.parent.showBattle('yugi');
          this.parent.spoken.yugi = true;
          this.parent.hidePass();
        }
        break;

      case 'toriko':
        if (this.parent.stepTalk === 1) {
          this.parent.txt(
            `J'avais le ventre vide, mais maintenant suis prêt à prendre ma revanche !`
          );
        } else if (this.parent.stepTalk === 2) {
          this.parent.txt('Parfait ! Itadakimasu !');
          this.parent.showBattle('toriko');
          this.parent.spoken.toriko = true;
          this.parent.hidePass();
        }
        break;

      case 'yusuke':
        if (this.parent.stepTalk === 1) {
          this.parent.txt(
            'Mon énergie astrale a vacillé pour une seconde. Je veux combattre encore !'
          );
        } else if (this.parent.stepTalk === 2) {
          this.parent.txt('Tu va moins faire le malin cette fois !');
          this.parent.showBattle('yusuke');
          this.parent.spoken.yusuke = true;
          this.parent.hidePass();
        }
        break;

      case 'kenichi':
        if (this.parent.stepTalk === 1) {
          this.parent.txt(
            `Une défaite n'es qu'un entraînement de plus. Cette fois je gagnerais.`
          );
          this.parent.showPass();
        } else if (this.parent.stepTalk === 2) {
          this.parent.txt('Tu va me dire des nouvelles de mes techniques !');
          this.parent.spoken.kenichi = true;
          this.parent.hidePass();
          this.parent.showBattle('kenichi');
        }
        break;

      case 'gon':
        if (this.parent.stepTalk === 1) {
          this.parent.txt(
            `Un hunter n'arrête jamais de courir après la victoire.`
          );
          this.parent.showPass();
        } else if (this.parent.stepTalk === 2) {
          this.parent.txt('Janke, Go !');
          this.parent.showBattle('gon');
          this.parent.spoken.gon = true;
          this.parent.hidePass();
        }
        break;

      case 'aladdin':
        if (this.parent.stepTalk === 1) {
          this.parent.txt(`As-tu envie d'un autre face-à-face ?`);
          this.parent.showPass();
        } else if (this.parent.stepTalk === 2) {
          this.parent.txt('Faisons de notre mieux !');
          this.parent.showBattle('aladdin');
          this.parent.spoken.aladdin = true;
          this.parent.hidePass();
        }
        break;

      case 'kenshin':
        if (this.parent.stepTalk === 1) {
          this.parent.txt(
            'Je ne peux pas me permettre de perdre une nouvelle fois.'
          );
          this.parent.showPass();
        } else if (this.parent.stepTalk === 2) {
          this.parent.txt('Combattons.');
          this.parent.showBattle('kenshin');
          this.parent.spoken.kenshin = true;
          this.parent.hidePass();
        }
        break;

      default:
        break;
    }
  }
}
