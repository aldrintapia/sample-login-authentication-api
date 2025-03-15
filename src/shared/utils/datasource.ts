import { DataSource } from 'typeorm';
import { migrationTypeORMConfig } from '../../../src/config/typeorm.config';

export const connectionSource = new DataSource(migrationTypeORMConfig);
