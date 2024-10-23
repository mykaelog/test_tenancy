import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { EntityNamingStrategy } from './strategies/entity-naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get('db.host'),
        port: parseInt(configService.get('db.port'), 10),
        database: configService.get('db.database'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        logging: configService.get('db.logging'),
        migrationsTableName: `${configService.get('db.prefix')}x_migration`,
        migrations: [
          `dist/migrations/common/*{.ts,.js}`,
          `dist/migrations/tenant/*{.ts,.js}`,
          `dist/migrations/inbonis/*{.ts,.js}`,
        ],
        migrationsRun: true,
        autoLoadEntities: true,
        synchronize: false,
        namingStrategy: new EntityNamingStrategy(
          configService.get('db.prefix'),
        ),
      }),
      dataSourceFactory: async (options): Promise<DataSource> => {
        const dataSource = addTransactionalDataSource(new DataSource(options));
        await dataSource.initialize();
        await dataSource.runMigrations();

        return dataSource;
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
