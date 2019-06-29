export class AdventureCreate {
  public parent;

  constructor(parent) {
    this.parent = parent;
  }

  public createPlayer(): void {
    this.parent.player = this.parent.physics.add.sprite(400, 500, 'perso');
    this.parent.player.setCollideWorldBounds(true);
    this._createPlayerAnims();
  }

  private _createPlayerAnims(): void {
    this.parent.anims.create({
      frameRate: 10,
      frames: this.parent.anims.generateFrameNumbers('perso', {
        end: 3,
        start: 0,
      }),
      key: 'left',
      repeat: -1,
    });

    this.parent.anims.create({
      frameRate: 10,
      frames: this.parent.anims.generateFrameNumbers('perso', {
        end: 8,
        start: 5,
      }),
      key: 'right',
      repeat: -1,
    });

    this.parent.anims.create({
      frameRate: 10,
      frames: this.parent.anims.generateFrameNumbers('perso', {
        end: 4,
        start: 4,
      }),
      key: 'up',
      repeat: -1,
    });

    this.parent.anims.create({
      frameRate: 10,
      frames: this.parent.anims.generateFrameNumbers('perso', {
        end: 4,
        start: 4,
      }),
      key: 'down',
      repeat: -1,
    });
  }

  public createBalls(): void {
    this.parent.balls = this.parent.physics.add.staticGroup();

    this.parent.ball1 = this.parent.balls.create(200, 350, 'ball');
    this.parent.ball2 = this.parent.balls.create(300, 350, 'ball');
    this.parent.ball3 = this.parent.balls.create(400, 350, 'ball');

    this.parent.physics.add.collider(this.parent.player, this.parent.balls);
  }

  public createPeople(): void {
    this.parent.people = this.parent.physics.add.staticGroup();
    this.parent.physics.add.collider(this.parent.player, this.parent.people);
  }

  public createTextElements(): void {
    this.parent.text = this.parent.add.text(100, 200, '', {
      fill: '#fff',
      fontSize: '16px',
      wordWrap: { width: 450, useAdvancedWrap: true },
    });

    this.parent.passText = this.parent.add.text(100, 200, '', {
      fill: '#fff',
      fontSize: '16px',
      wordWrap: { width: 450, useAdvancedWrap: true },
    });
  }
}
