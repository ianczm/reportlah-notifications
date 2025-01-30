import * as migration_20250130_173939_init from './20250130_173939_init';

export const migrations = [
  {
    up: migration_20250130_173939_init.up,
    down: migration_20250130_173939_init.down,
    name: '20250130_173939_init'
  },
];
