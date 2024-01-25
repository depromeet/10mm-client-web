interface GraphBaseType {
  status: 'past-level' | 'present-level' | 'future-level' | 'last-level';
  symbolStack: number;
}

export interface PastLabelGraphType extends GraphBaseType {
  status: 'past-level';
}

export interface PresentLevelGraphType extends GraphBaseType {
  status: 'present-level';
}

export interface FutureLevelGraphType extends GraphBaseType {
  status: 'future-level';
  level: number;
}

export interface LastLevelGraphType extends GraphBaseType {
  status: 'last-level';
  min: number;
}

export type GraphType = PastLabelGraphType | PresentLevelGraphType | FutureLevelGraphType | LastLevelGraphType;
