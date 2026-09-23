import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasModule } from './reservas/infrastructure/nestjs/reservas.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const database = config.get<string>('RESERVAS_SERVICE_SQLITE_DATABASE');

        if (!database) {
          throw new Error(
            'Falta RESERVAS_SERVICE_SQLITE_DATABASE. Copia .env.example a .env',
          );
        }
        return {
          type: 'better-sqlite3',
          database,
          autoLoadEntities: true,
          synchronize:
            config.get<string>('RESERVAS_SERVICE_SQLITE_SYNCHRONIZE') ===
            'true',
          logging:
            config.get<string>('RESERVAS_SERVICE_SQLITE_LOGGING') === 'true',
        };
      },
    }),
    ReservasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
