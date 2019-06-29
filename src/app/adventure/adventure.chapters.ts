export class AdventureChapters {
  public parent;

  constructor(parent) {
    this.parent = parent;
  }

  public firstChapter(): void {
    this.parent.chapter = 1;
    this.parent.clearTxt();
    this.parent.balls.clear(true, true);

    this.parent.addPersoToScene(300, 200, 'korosensei');
    this.parent.addPersoToScene(100, 100, 'rukia');
    this.parent.addPersoToScene(450, 150, 'piccolo');
  }

  public secondChapter(): void {
    this.parent.chapter = 2;
    this.parent.clearTxt();
  }

  public thirdChapter(): void {
    this.parent.chapter = 3;
    this.parent.addPersoToScene(500, 100, 'korosensei');
  }

  public fourthChapter(): void {
    this.parent.chapter = 4;
    this.parent.addPersoToScene(1100, 200, 'yusuke');
    this.parent.addPersoToScene(600, -400, 'saitama');
  }

  public fifthChapter(): void {
    this.parent.chapter = 5;
    this.parent.addPersoToScene(-300, 0, 'kenichi');
  }

  public sixthChapter(): void {
    this.parent.chapter = 6;
    this.parent.addPersoToScene(-400, 0, 'gon');
  }

  public seventhChapter(): void {
    this.parent.chapter = 6;
  }

  public updateChapter(): void {
    switch (this.parent.chapter) {
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
}
