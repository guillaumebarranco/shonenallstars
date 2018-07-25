export interface Character {
  atk: number;
  atk_spe: number;
  attack_1: Attack;
  attack_2: Attack;
  attack_3: Attack;
  attack_4: Attack;
  condition: string;
  def: number;
  def_spe: number;
  id: number;
  img_back: string;
  img_front: string;
  manga_name: string;
  name: string;
  vit: 70;
}

export class Attack {
  anim: string;
  name: string;
  power: number;
  requis: number;
  type: string;
}

export interface CharacterResponse {
  persos: Character[];
}

export interface CharacterBattleConfig {
  life: number;
  pp: number;
}
