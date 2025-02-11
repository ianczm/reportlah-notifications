import * as migration_20250130_173939_init from './20250130_173939_init';
import * as migration_20250201_185129_add_channel_recipient_type_column from './20250201_185129_add_channel_recipient_type_column';
import * as migration_20250209_115328_add_notification_response_column from './20250209_115328_add_notification_response_column';
import * as migration_20250211_100136_add_user_name_column from './20250211_100136_add_user_name_column';

export const migrations = [
  {
    up: migration_20250130_173939_init.up,
    down: migration_20250130_173939_init.down,
    name: '20250130_173939_init',
  },
  {
    up: migration_20250201_185129_add_channel_recipient_type_column.up,
    down: migration_20250201_185129_add_channel_recipient_type_column.down,
    name: '20250201_185129_add_channel_recipient_type_column',
  },
  {
    up: migration_20250209_115328_add_notification_response_column.up,
    down: migration_20250209_115328_add_notification_response_column.down,
    name: '20250209_115328_add_notification_response_column',
  },
  {
    up: migration_20250211_100136_add_user_name_column.up,
    down: migration_20250211_100136_add_user_name_column.down,
    name: '20250211_100136_add_user_name_column'
  },
];
