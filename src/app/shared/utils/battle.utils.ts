import { BattleTool } from '../interfaces/battle/battle-tool';
import { BattleToolEffect } from '../interfaces/battle/battle-tool-effect';
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

export const toolEffect: { [key: string]: BattleToolEffect } = {
  [BattleTool.LifePotion]: {
    life: 50,
    pp: 0,
  },
  [BattleTool.PPPotion]: {
    life: 0,
    pp: 50,
  },
  [BattleTool.DoublePotion]: {
    life: 25,
    pp: 25,
  },
  [BattleTool.Shoshinsui]: {
    life: 100,
    pp: -50,
  },
};
