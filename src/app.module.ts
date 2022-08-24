import { Module, ValidationPipe } from '@nestjs/common';
import { LinksModule } from './modules/links/links.module';
import { StatsModule } from './modules/stats/stats.module';
import { APP_PIPE } from '@nestjs/core';
import { RedisModule } from '@svtslv/nestjs-ioredis';

@Module({
    imports: [
        RedisModule.forRoot({
            config: {
                host: 'redis',
            },
        }),
        LinksModule,
        StatsModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
    ],
})
export class AppModule {}
