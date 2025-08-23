export type BonificationType = {
  name: string;
  description: string;
  effect: 'heal' | 'critical' | 'shield';
};

export type Bonnification = {
  active: boolean;
  type: BonificationType | null;
};

export type ActiveEffect = {
  critical: boolean;
  shield: boolean;
};
