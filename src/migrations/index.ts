import * as migration_20261022_104024_initial from './20261022_104024_initial';
import * as migration_20261022_142525_news_date_precision from './20261022_142525_news_date_precision';
import * as migration_20261022_175110_saagdo_video_url from './20261022_175110_saagdo_video_url';

export const migrations = [
  {
    up: migration_20261022_104024_initial.up,
    down: migration_20261022_104024_initial.down,
    name: '20261022_104024_initial',
  },
  {
    up: migration_20261022_142525_news_date_precision.up,
    down: migration_20261022_142525_news_date_precision.down,
    name: '20261022_142525_news_date_precision',
  },
  {
    up: migration_20261022_175110_saagdo_video_url.up,
    down: migration_20261022_175110_saagdo_video_url.down,
    name: '20261022_175110_saagdo_video_url'
  },
];
