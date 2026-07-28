import * as migration_20260728_201153_initial from './20260728_201153_initial';

export const migrations = [
  {
    up: migration_20260728_201153_initial.up,
    down: migration_20260728_201153_initial.down,
    name: '20260728_201153_initial'
  },
];
