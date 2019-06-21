import { Character } from '../interfaces/character/character';

export function getAttackForce(
  power: number,
  type: string,
  who: string,
  ally: Character,
  ennemy: Character
) {
  return type === 'physic'
    ? getPhysicalAttackForce(power, who, ally, ennemy)
    : getSpecialAttackForce(power, who, ally, ennemy);
}

function getPhysicalAttackForce(
  power: number,
  who: string,
  ally: Character,
  ennemy: Character
) {
  return who === 'ally'
    ? ally.atk >= ennemy.def
      ? power + 5
      : power - 5
    : ennemy.atk >= ally.def
    ? power + 5
    : power - 5;
}

function getSpecialAttackForce(
  power: number,
  who: string,
  ally: Character,
  ennemy: Character
) {
  return who === 'ally'
    ? ally.atk_spe >= ennemy.def_spe
      ? power + 5
      : power - 5
    : ennemy.atk_spe >= ally.def_spe
    ? power + 5
    : power - 5;
}
