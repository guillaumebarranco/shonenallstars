export const adventureAssets: string[] = [
  'ball',
  'korosensei',
  'piccolo',
  'rukia',
  'yugi',
  'aladdin',
  'ichigo',
  'tsubasa',
  'gon',
  'kenichi',
  'kenshin',
  'toriko',
  'yusuke',
  'naruto',
  'goku',
  'luffy',
  'saitama',
];

export const getCloseObject = (balls: any, player: any, people: any) => {
  let proxi = 100;
  let choosed = null;

  const ballsChildren = Object.entries(balls.children)[0][1] as any[];

  ballsChildren.forEach((ball, index) => {
    if (Math.abs(ball.x - player.x) < proxi) {
      proxi = Math.abs(ball.x - player.x);
      choosed = `ball${index + 1}`;
    }
  });

  const peopleChildren = Object.entries(people.children)[0][1] as any[];

  if (!choosed) {
    peopleChildren.forEach(p => {
      if (Math.abs(p.x - player.x) < proxi) {
        proxi = Math.abs(p.x - player.x);
        choosed = p.texture.key;
      }
    });
  }

  return choosed;
};
